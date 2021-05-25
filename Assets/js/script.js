//Display Current Date 
var currentDay = $("#currentDay");
currentDay.text (moment().format('dddd, MMM Do YYYY'));

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#city-input");
var searchedBtn = document.querySelector("#city-search");
var formSubmitHandler = function(event) {
    event.preventDefault();
    var userCity = nameInputEl.value.trim();
    console.log("userCity", userCity);
    getCityWeather(userCity);
  };

  var CPTLZD = function(str) {
    var result = [];
    var words = str.split(" ");
    for (var i = 0; i < words.length; i++) {
      var word = words[i].split("");
      word[0] = word[0].toUpperCase();
      result.push(word.join(""));
    }
    console.log(result.join(" "))
    return result.join(" ");
  };

searchedBtn.addEventListener("click",formSubmitHandler);

function getCityWeather(userCity){
    document.querySelector("#currentCity").innerText = "Weather in " + userCity;
    var apiKey = "01b527455a926f9252fa11df79f092b5";
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
    userCity + 
    "&units=imperial&appid=" +
    apiKey)
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        console.log(data);
        console.log(data.coord.lon);
        var cityLon = data.coord.lon;
        console.log(data.coord.lat);
        var cityLat = data.coord.lat;
        var icon = data.weather[0].icon;
        document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
        var description = data.weather[0].description;
        var descriptionCap = CPTLZD(description);
        document.querySelector(".description").innerText = descriptionCap;
        var temp = data.main.temp;
        document.querySelector(".temp").innerText = temp + "°F";
        var speed = data.wind.speed;
        document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " mph";
        var humidity = data.main.humidity
        document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
        return fetch(
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                cityLat +
                "&lon=" + 
                cityLon + 
                "&appid=" +
                apiKey
        );
    })
    .then(function(resp) { 
        return resp.json();
    })
    .then(function(data) {
        console.log(data);
        var uvIndex = data.current.uvi;
        document.querySelector(".uvi").innerText = "UV Index: " + uvIndex;
    })
    .catch(function(err) {
        "Error Text: " + err
    });
};




// fetch(
// "https://api.openweathermap.org/data/2.5/weather?q=" +
//     city +
//     "&units=imperial&appid=" +
//     this.apiKey
// )
// .then((response) => {
//     if (!response.ok) {
//     alert("No weather found.");
//     throw new Error("No weather found.");
//     }
//     return response.json();
// })
// .then((data) => this.displayWeather(data));
// },
// displayWeather: function (data) {
// const { name } = data;
// const { icon, description } = data.weather[0];
// const { temp, humidity } = data.main;
// const { speed } = data.wind;
// const { lat } = data.coord;
// const { long } = data.coord;

// document.querySelector("#currentCity").innerText = "Weather in " + name;
// document.querySelector(".icon").src =
// "https://openweathermap.org/img/wn/" + icon + ".png";
// document.querySelector(".description").innerText = description;
// document.querySelector(".temp").innerText = temp + "°F";
// document.querySelector(".humidity").innerText =
// "Humidity: " + humidity + "%";
// document.querySelector(".wind").innerText =
// "Wind speed: " + speed + " mph";
// },
// search: function () {
// this.fetchWeather(document.querySelector("#citySearch").value);
// },
// };

//   document.querySelector("#citySearch").addEventListener("click", function () {
//     weather.search();
//   });
  
//   document
//     .querySelector("#citySearch")
//     .addEventListener("keyup", function (event) {
//       if (event.key == "Enter") {
//         weather.search();
//       }
//     });

// weather.displayWeather();




