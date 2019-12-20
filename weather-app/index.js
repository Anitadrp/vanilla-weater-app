function displayCity(event) {
  event.preventDefault();
  const citySearch = document.querySelector(".citySearch"); //search-bar
  const city = { name: citySearch.value };
  citySearch.value = "";

  setCity(city);
}

function setCity(city) {
  const apiKey = "3fceae23dde22994db28dbf0244f6a96";
  let apiUrlWeather;
  let apiUrlForecast;
  if ("id" in city) {
    apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&units=metric&appid=${apiKey}`;
    apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?id=${city.id}&units=metric&appid=${apiKey}`;
  } else {
    apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=${apiKey}`;
    apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&units=metric&appid=${apiKey}`;
  }

  axios.get(apiUrlWeather).then(handleCityTemperature);
  axios.get(apiUrlForecast).then(handlecurrentCityForecast);
}

function handleCityTemperature(response) {
  const cityElement = currentCity;
  cityElement.innerHTML = response.data.name;

  currentWeather = response;

  temperatureChange();
  statsCurrentWeather(response);
}

let currentWeather = null;
let currentForecast = null;
let isCelcius = true;

let temperature = document.querySelector(".temperature");
let temperatureElement = document.createElement("div");
temperature.appendChild(temperatureElement);

function temperatureChange() {
  if (!currentWeather) {
    return;
  }

  const cityTemperature = currentWeather.data.main.temp;
  const currentTemperature = Math.round(cityTemperature);

  if (isCelcius) {
    temperatureElement.innerHTML = `${currentTemperature}˚C`;
  } else {
    let fahrenheitTemperature = Math.round(currentTemperature * (9 / 5) + 32);
    temperatureElement.innerHTML = `${fahrenheitTemperature}˚F`;
  }

  if (temperature.children.length > 2) {
    temperature.removeChild(temperature.children[2]);
  }

  const currentCityIcon = new Image();
  currentCityIcon.src = `https://openweathermap.org/img/wn/${currentWeather.data.weather[0].icon}@2x.png`;
  temperature.appendChild(currentCityIcon);
}

let temperatureButtonElement = document.createElement("button");
temperatureButtonElement.setAttribute("class", "fahrenheit");
temperatureButtonElement.innerHTML = "°F";
temperatureButtonElement.addEventListener("click", function() {
  if (isCelcius) {
    isCelcius = false;
    temperatureButtonElement.setAttribute("class", "celsius");
    temperatureButtonElement.textContent = "˚C";
  } else {
    isCelcius = true;
    temperatureButtonElement.setAttribute("class", "fahrenheit");
    temperatureButtonElement.textContent = "˚F";
  }

  temperatureChange();
});

temperature.appendChild(temperatureButtonElement);

function statsCurrentWeather(response) {
  const stats = document.querySelector(".stats");
  stats.innerHTML = null;

  const statsElements = document.createElement("div");
  stats.appendChild(statsElements);

  const wind = response.data.wind.speed;
  const humidity = response.data.main.humidity;
  statsElements.innerHTML = `Wind speed: ${wind} m/s<br>Humidity: ${humidity} %`;
}

let search = document.querySelector(".searchButton");
search.addEventListener("click", displayCity);

function currentPosition() {
  navigator.geolocation.getCurrentPosition(currentPositionCoords);
}

function currentPositionCoords(position) {
  const apiKey = "3fceae23dde22994db28dbf0244f6a96";

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrlWeather).then(handleCityTemperature);
  axios.get(apiUrlForecast).then(handlecurrentCityForecast);
}

const currentLocation = document.querySelector(".currentLocation");
currentLocation.addEventListener("click", currentPosition);

function handlecurrentCityForecast(response) {
  const currentCityForecast = document.querySelector(".forecast");
  currentCityForecast.innerHTML = null;

  for (let i = 0; i < 6; i++) {
    const currentCityForecastElement = document.createElement("div");
    currentCityForecastElement.setAttribute("class", "col");
    currentCityForecastElement.innerHTML = `${response.data.list[i].main.temp}˚C<br> ${response.data.list[i].dt_txt}<br> <img src="https://openweathermap.org/img/wn/${response.data.list[i].weather[0].icon}@2x.png" />`;

    currentCityForecast.appendChild(currentCityForecastElement);
  }
}

let body = document.querySelector("body");
let gitLink = document.createElement("a");
body.appendChild(gitLink);

gitLink.setAttribute("href", "https://github.com/Anitadrp/weather-app");
gitLink.setAttribute("target", "blank");
gitLink.innerHTML = "Open source code - Anitadrp";

let currentCityScreen = document.querySelector(".currentCityScreen");
let currentCity = document.createElement("h1");
currentCityScreen.appendChild(currentCity);

currentCity.innerHTML = "Loading...";

currentPosition();
displayTime();
