//Display Current & Future Dates
var currentDay = $("#currentDay");
currentDay.text(moment().format("dddd, MMM Do YYYY"));
var futureDay1 = $("#future-day-1");
futureDay1.text(moment().add(1, "days").format("dddd, Do"));
var futureDay2 = $("#future-day-2");
futureDay2.text(moment().add(2, "days").format("dddd, Do"));
var futureDay3 = $("#future-day-3");
futureDay3.text(moment().add(3, "days").format("dddd, Do"));
var futureDay4 = $("#future-day-4");
futureDay4.text(moment().add(4, "days").format("dddd, Do"));
var futureDay5 = $("#future-day-5");
futureDay5.text(moment().add(5, "days").format("dddd, Do"));
var futureDay6 = $("#future-day-6");
futureDay6.text(moment().add(6, "days").format("dddd, Do"));
var futureDay7 = $("#future-day-7");
futureDay7.text(moment().add(7, "days").format("dddd, Do"));

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#city-input");
var searchedBtn = document.querySelector("#city-search");
var formSubmitHandler = function (event) {
  event.preventDefault();
  var userCity = nameInputEl.value.trim();
  console.log("Searched City:", userCity);
  getCityWeather(userCity);
};

var CPTLZD = function (wordToBeCap) {
  var result = [];
  var words = wordToBeCap.split(" ");
  for (var i = 0; i < words.length; i++) {
    var word = words[i].split("");
    word[0] = word[0].toUpperCase();
    result.push(word.join(""));
  }
  // console.log(result.join(" "))
  return result.join(" ");
};

searchedBtn.addEventListener("click", formSubmitHandler);

function getCityWeather(userCity) {
  //DOM Manipulation
  document.querySelector("#currentCity").innerText = "Weather in " + userCity;

  //API info
  var apiKey = "01b527455a926f9252fa11df79f092b5";
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      userCity +
      "&units=imperial&appid=" +
      apiKey
  )
    .then(function (bob) {
      return bob.json();
    })
    .then(function (data) {
      console.log(data);
      var cityLon = data.coord.lon;
      var cityLat = data.coord.lat;
      var icon = data.weather[0].icon;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      var description = data.weather[0].description;
      var descriptionCap = CPTLZD(description);
      document.querySelector(".description").innerText = descriptionCap;
      var temp = data.main.temp;
      document.querySelector(".temp").innerText = temp + "°F";
      var temp = data.main;
      var speed = data.wind.speed;
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " mph";
      var humidity = data.main.humidity;
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
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      var uvIndex = data.current.uvi;
      if (uvIndex > 7) {
        document.querySelector(".uvi").innerText = "UV Index: " + uvIndex;
        document.querySelector(".uvi").style.color = "red";
      }
      if (uvIndex > 5) {
        document.querySelector(".uvi").innerText = "UV Index: " + uvIndex;
      } else {
        document.querySelector(".uvi").innerText = "UV Index: " + uvIndex;
      }
    })
    .catch(function (err) {
      "Error Text: " + err;
    });
}
