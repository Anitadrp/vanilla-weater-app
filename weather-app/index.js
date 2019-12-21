function fahrenheit(temperature) {
  return temperature * (9 / 5) + 32;
}

function displayCity(event) {
  event.preventDefault();
  const citySearch = document.querySelector(".citySearch");
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
  axios.get(apiUrlForecast).then(handleCityForecast);
}

let currentWeather = null;
let currentForecast = null;
let isCelcius = true;

function handleCityTemperature(response) {
  const cityElement = currentCity;
  cityElement.innerHTML = response.data.name;

  currentWeather = response;

  temperatureChange();
}

const temperature = document.querySelector(".temperature");
const temperatureElement = document.createElement("div");
temperature.appendChild(temperatureElement);

function temperatureChange() {
  if (!currentWeather) {
    return;
  }

  const cityTemperature = currentWeather.data.main.temp;
  const currentTemperature = cityTemperature;

  if (isCelcius) {
    temperatureElement.innerHTML = `${currentTemperature.toFixed(1)}˚C`;
  } else {
    temperatureElement.innerHTML = `${fahrenheit(currentTemperature).toFixed(
      1
    )}˚F`;
  }

  if (temperature.children.length > 2) {
    temperature.removeChild(temperature.children[2]);
  }

  const currentCityIcon = new Image();
  currentCityIcon.src = `https://openweathermap.org/img/wn/${currentWeather.data.weather[0].icon}@2x.png`;
  temperature.appendChild(currentCityIcon);

  statsCurrentWeather(currentWeather);
}

const temperatureButtonElement = document.createElement("button");
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
  forecastChange();
});

temperature.appendChild(temperatureButtonElement);

function statsCurrentWeather(response) {
  const stats = document.querySelector(".stats");
  stats.innerHTML = null;

  const statsElements = document.createElement("div");
  stats.appendChild(statsElements);

  const description = response.data.weather[0].main;
  const humidity = response.data.main.humidity;

  let wind;
  let realFeel;

  if (isCelcius) {
    wind = `${response.data.wind.speed} m/s`;
    realFeel = `${response.data.main.feels_like.toFixed(1)}˚C`;
  } else {
    wind = `${(response.data.wind.speed * 2.23694).toFixed(1)} mph`;
    realFeel = `${fahrenheit(response.data.main.feels_like).toFixed(1)}˚F`;
  }

  statsElements.innerHTML = `
    <span class="description">${description}</span><br>
    Wind speed: <span class="largeValue">${wind}</span><br>
    Humidity: <span class="largeValue">${humidity} %</span><br>
    Feels like: <span class="largeValue">${realFeel}</span>
  `;
}

const search = document.querySelector(".searchButton");
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
  axios.get(apiUrlForecast).then(handleCityForecast);
}

const currentLocation = document.querySelector(".currentLocation");
currentLocation.addEventListener("click", currentPosition);

function handleCityForecast(response) {
  currentForecast = response;

  forecastChange();
}

function forecastChange() {
  if (!currentForecast) {
    return;
  }

  const currentCityForecast = document.querySelector(".forecast");
  currentCityForecast.innerHTML = null;

  for (let i = 0; i < 6; i++) {
    const currentCityForecastElement = document.createElement("div");
    currentCityForecastElement.setAttribute("class", "col-4");
    let forecastTemperature;
    if (isCelcius) {
      forecastTemperature = `${currentForecast.data.list[i].main.temp.toFixed(
        1
      )}˚C`;
    } else {
      forecastTemperature = `${fahrenheit(
        currentForecast.data.list[i].main.temp
      ).toFixed(1)}˚F`;
    }
    const forecastTime = currentForecast.data.list[i].dt_txt;
    currentCityForecastElement.innerHTML = `
      <span class="largeValue">${forecastTemperature}</span><br>
      ${forecastTime.slice(11, 16)}<br>
      <img src="https://openweathermap.org/img/wn/${
        currentForecast.data.list[i].weather[0].icon
      }@2x.png" />
    `;

    currentCityForecast.appendChild(currentCityForecastElement);
  }
}

const body = document.querySelector("body");
const gitLink = document.createElement("a");
body.appendChild(gitLink);

gitLink.setAttribute("href", "https://github.com/Anitadrp/weather-app");
gitLink.setAttribute("target", "blank");
gitLink.innerHTML = "Open source code - Anitadrp";

const currentCityScreen = document.querySelector(".currentCityScreen");
const currentCity = document.createElement("h1");
currentCityScreen.appendChild(currentCity);

currentCity.innerHTML = "Loading...";

currentPosition();
displayTime();
