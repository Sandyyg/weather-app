function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
  
  function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
  
    let forecastHTML = 'div class="row">';
    let days = ["Thu", "Fri", "Sat", "Sun"];
    days.forEach(function (day) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
         <div class="forecast-days" id="forecast"><center>${day}</center></div>
         <div class="row">
            <div class="col-2">
                        
           <span class="forecast-weather"><center><i class="fas fa-sun"></i></center></span>
                          </div>
                          </div>
                      </div>
                      <div class="row">
                      <div class="col-2">
                  <span class="forecast-temperature-max"> 43° <strong></span>
                    <span class="forecast-temperature-min">24°</strong></i></span>
                  `;
    });
    forecastHTML = forecastHTML + "</div>";
    forecastElement.innerHTML = forecastHTML;
  }

  function displayWeatherCondition(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp);
      celsiusTemperature = response.data.main.temp;
    let iconElement = document.querySelector("#icon");
    let windElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity");
    let descriptionElement = document.querySelector("#description");

    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
      
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  }


      
      
  
  
  function searchCity(city) {
    let apiKey = "4f72377de7c73b4dbc12a5b9e696bb4b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);

  }
  
  function searchLocation(position) {
    let apiKey = "4f72377de7c73b4dbc12a5b9e696bb4b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayWeatherCondition);
  }


  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.add("active");
let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
    
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
   
  }
  
  function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }

  let celsiusTemperature = null;

  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);

   let fahrenheitLink = document.querySelector("#fahrenheit-link");
   fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

   let celsiusLink = document.querySelector("#celsius-link");
   celsiusLink.addEventListener("click", displayCelsiusTemperature);
   

  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  searchCity("Chicago");
  