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




