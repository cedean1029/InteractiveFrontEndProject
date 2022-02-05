var aviaApiKey = "1f95fd-f0ea67";

// getting all values we need from this url so when user puts the name of a city, it maches it return what we need
var cityDataBase = [];
var citySearch = function () {
  var cityUrl = `https://aviation-edge.com/v2/public/cityDatabase?key=${aviaApiKey}`;
  fetch(cityUrl)
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      console.log(
        "hii",
        // getting spicific information we need from this url
        data[0].nameCity,
        data[0].codeIataCity,
        data[0].latitudeCity,
        data[0].longitudeCity
      );
      data.forEach((element) => {
        cityDataBase.push({
          city: element.nameCity.toLowerCase(),
          iata: element.codeIataCity,
          lat: element.latitudeCity,
          lon: element.longitudeCity,
        });
      });
    });
};
citySearch();

document.getElementById("search-btn").addEventListener("click", userInput);

function userInput() {
  console.log("yo", cityDataBase);
  event.preventDefault();
  var userCity = document.getElementById("city-name").value.toLowerCase();
  console.log("user-city ", userCity);
  // looping over the cities and making sure that value matches whatever user's input is
  for (var i = 0; i < cityDataBase.length; i++) {
    if (userCity == cityDataBase[i].city) {
      console.log("citycity", cityDataBase[i]);

      var flights = cityDataBase[i].iata;
      console.log("bla bla ", flights);
      arrivalData(flights);
    }
  }
}
// getting arivals data
function arrivalData(flights) {
  var arrivalsUrl = `https://aviation-edge.com/v2/public/flights?key=${aviaApiKey}&arrIata=${flights}`;
  fetch(arrivalsUrl)
    .then(function (response) {
      if (response.ok) {
        console.log("dataaa", response);
        return response.json();
      }
    })
    .then(function (data) {
      console.table("hellooo", data);
      // clear old element
      displayArrDep(data);
    });
}
// display aircraft, airline, arrivals, departures to the page
var displayArrDep = function (data) {
  for (var i = 0; i < data.length; i++) {
    var aircraft = data[i].aircraft.iataCode;
    var aircraftEl = document.createElement("p");
    aircraftEl.textContent = "AIRCRAFT " + i + " " + aircraft;

    $("#display").append(aircraftEl);

    var departures = data[i].departure.iataCode;
    var departuresEl = document.createElement("p");
    departuresEl.textContent = "DEPARTURES: " + departures;
    $("#display").append(departuresEl);
  }
};

// got that displaying on the page , but cannot get the value of aircraft, it says it's undefined but it is on the page
// we will need to get other values displaying on the page exactly the same way
