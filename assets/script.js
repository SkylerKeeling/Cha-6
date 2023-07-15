const APIKey = "ab63b8d5c4c2a640bb6696b4c3b87a21"
renderingCityHTML()
hideSearchHistory()

$("#searchButton").on("click", function () {
  let city = $("#searchInput").val()
  console.log(city)
  getCoordinates(city)
  storingCity(city)
  renderingCityHTML()
  $("#fiveDay").empty()
  showSearchHistory()
})

function hideSearchHistory() {
  $("#searchHistory").hide()
}
function showSearchHistory() {
  $("#searchHistory").show()
}

function storingCity(city) {
  const storage = localStorage.getItem("cities")
  if (storage == null) {
    localStorage.setItem("cities", JSON.stringify([city]))
  } else {
    const storageUnit = JSON.parse(storage)
    storageUnit.unshift(city)
    if (storageUnit.length > 5) {
      storageUnit.pop()
    }
    localStorage.setItem("cities", JSON.stringify(storageUnit))
  }
}

function renderingCityHTML() {
  const displayedHistory = JSON.parse(localStorage.getItem("cities"))
  if (displayedHistory) {
    $("#searchHistory").empty()
    searchHistoryText = $("<th>").text("Search History:")
    $("#searchHistory").append(searchHistoryText)
    for (var i = 0; i < displayedHistory.length; i++) {
      let cityHistory = $("<tr>")
      cityHistory.text(displayedHistory[i])
      $("#searchHistory").append(cityHistory)
    }
  }
}

function getCoordinates(cityValue) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=5&appid=${APIKey}`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data)
      getCurrentWeather(data[0].lat, data[0].lon)
      getFiveDayWeather(data[0].lat, data[0].lon)
    })
}

function getCurrentWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data)
      $("#currentWeather").empty()
      let cityName = $("<h2>").text(data.name)
      $("#currentWeather").append(cityName)
      if (data.weather[0].main == "Clouds") {
        $("#currentWeather").append(
          "<i class='fa-solid fa-cloud fa-5x' style></i>"
        )
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
      const dateToday = $("<h4>").text(dayjs().format("YYYY-MM-DD"))
      $("#currentWeather").append(dateToday)
      var temp = $("<h4>").text("temp: " + data.main.temp)
      $("#currentWeather").append(temp)
      let theWeather = $("<h4>").text("weather: " + data.weather[0].description)
      $("#currentWeather").append(theWeather)
      let humidity = $("<h4>").text("humidity: " + data.main.humidity)
      $("#currentWeather").append(humidity)
      let currentCard = $("#currentWeather")
      currentCard.removeClass("border-0")
      currentCard.addClass("border border-3 border-dark rounded p-2")
    })
}

function getFiveDayWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data)
      for (var i = 0; i < data.list.length; i += 8) {
        let fiveDayCard = $("<div>")
        if (data.list[i].weather[0].main == "Clouds") {
          fiveDayCard.append("<i class='fa-solid fa-cloud fa-3x' style></i>")
        } else if (data.list[i].weather[0].main == "Thunderstorm") {
          fiveDayCard.append("<i class='fa-solid fa-cloud-bolt fa-3x'></i>")
        } else if (data.list[i].weather[0].main == "clear") {
          fiveDayCard.append("<i class='fa-solid fa-sun fa-3x'></i>")
        } else if (data.list[i].weather[0].main == "Rain") {
          fiveDayCard.append(
            "<i class='fa-solid fa-cloud-showers-heavy fa-3x'></i>"
          )
        } else if (data.list[i].weather[0].main == "Drizzle") {
          fiveDayCard.append("<i class='fa-solid fa-cloud-rain fa-3x'></i>")
        } else if (data.list[i].weather[0].main == "Snow") {
          fiveDayCard.append("<i class='fa-solid fa-snowflake fa-3x'></i>")
        }
        let dateToday = $("<h4>").text(data.list[i].dt_txt.slice(0, 10))
        fiveDayCard.append(dateToday)
        var temp = $("<h4>").text("temp: " + data.list[i].main.temp)
        fiveDayCard.append(temp)
        let theWeather = $("<h4>").text(
          "weather: " + data.list[i].weather[0].main
        )
        fiveDayCard.append(theWeather)
        let humidity = $("<h4>").text("humidity: " + data.list[i].main.humidity)
        fiveDayCard.append(humidity)
        fiveDayCard.addClass("border border-3 border-dark rounded p-2 w-100")
        $("#fiveDay").append(fiveDayCard)

        console.log(fiveDayCard)
      }
    })
}
