// var weatherData = {
// Temperature: 0,
// Humidity: 0,
// }

// //Save Button Clicked Function
// $(".saveBtn").on("click", function(){
//     //Key
//     var key = $(this).parent().attr("id").split("-")[1];
//     //Value
//     var value = $(this).parent().find(".description").val();
//     //Save Key and Value to Local Storage
//     localStorage.setItem(key,value);
// });

const apiKey1 = 
'01b527455a926f9252fa11df79f092b5';
var lat = 39.768;
var lon = -86.158;
var weatherByLocationURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey1

fetch(weatherByLocationURL)

.then(response=>{return response.json()})

.then(data=>{console.log(data)})

.catch(err=>{console.log("Error Found"+err)})

