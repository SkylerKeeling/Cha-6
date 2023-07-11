const APIKey = "ab63b8d5c4c2a640bb6696b4c3b87a21"

$("#searchButton").on("click", function () {
  let city = $("#searchInput").val()
  console.log(city)
  getCoordinates(city)
  $("#currentWeather").clear($("<h3>"))
})

function getCoordinates(cityValue) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=5&appid=${APIKey}`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data)
      getCurrentWeather(data[0].lat, data[0].lon)
    })
}

function getCurrentWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data)
      var temp = $("<h3>").text("temp: " + data.main.temp)
      $("#currentWeather").append(temp)
    })
  // details for current weather
  // city name
  // date
  // icon for tempature
  // temp
  // humidity
}

// function getFutureWeather () {
// 5 day forecast
// displays date for each day
//icon for weather
//temp
//wind speed
//humidity
//}

//code for five history searches
