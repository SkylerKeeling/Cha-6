const APIKey = "ab63b8d5c4c2a640bb6696b4c3b87a21"

$("#searchButton").on("click", function () {
  let city = $("#searchInput").val()
  console.log(city)
  getCoordinates(city)
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
      let cityName = $("<h3>").text(data.name)
      $("#currentWeather").append(cityName)
      var temp = $("<h3>").text("temp: " + data.main.temp)
      $("#currentWeather").append(temp)
      let theWeather = $("<h3>").text("weather: " + data.weather[0].description)
      $("#currentWeather").append(theWeather)
      const dateToday = $("<h3>").text(dayjs().format("MM / DD / YYYY"))
      $("#currentWeather").append(dateToday)
      let humidity = $("<h3>").text("humidity: " + data.main.humidity)
      $("#currentWeather").append(humidity)

      // icon for tempature
      if (data.weather[0].main == "Clouds") {
        $("#currentWeather").append("<i class='fa-solid fa-cloud'></i>")
      } else if (data.weather[0].main == "Thunderstorm") {
        $("#currentWeather").append("<i class='fa-solid fa-cloud-bolt'></i>")
      } else if (data.weather[0].main == "clear") {
        $("#currentWeather").append("<i class='fa-solid fa-sun'></i>")
      } else if (data.weather[0].main == "Rain") {
        $("#currentWeather").append(
          "<i class='fa-solid fa-cloud-showers-heavy'></i>"
        )
      } else if (data.weather[0].main == "Drizzle") {
        $("#currentWeather").append("<i class='fa-solid fa-cloud-rain'></i>")
      } else if (data.weather[0].main == "Snow") {
        $("currentWeather").append("<i class='fa-solid fa-snowflake'></i>")
      }
    })
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
