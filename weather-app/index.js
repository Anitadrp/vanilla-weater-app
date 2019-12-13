let currentCityScreen = document.querySelector(".currentCityScreen");
let currentCity = document.createElement("h1");
currentCityScreen.appendChild(currentCity);

currentCity.innerHTML = "Faro";

displayTime();

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
  let apiUrlForcast;
  if ("id" in city) {
    apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&units=metric&appid=${apiKey}`;
    apiUrlForcast = `https://api.openweathermap.org/data/2.5/forecast?id=${city.id}&units=metric&appid=${apiKey}`;
  } else {
    apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=${apiKey}`;
    apiUrlForcast = `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&units=metric&appid=${apiKey}`;
  }

  axios.get(apiUrlWeather).then(handleCityTemperature);
  axios.get(apiUrlForcast).then(handleForcast);
}

function handleCityTemperature(response) {
  let cityElement = currentCity;
  cityElement.innerHTML = response.data.name;
  //alert(currentCity);
  let cityTemperature = response.data.main.temp;
  currentTemperature = Math.round(cityTemperature);
  temperatureChange();
  statsCurrentWeather(response);
}

let currentTemperature = 0;
let isCelcius = true;

let temperature = document.querySelector(".temperature");
let temperatureElement = document.createElement("div");
temperature.appendChild(temperatureElement);
function temperatureChange() {
  if (isCelcius) {
    temperatureElement.innerHTML = `${currentTemperature}˚C`;
  } else {
    let fahrenheitTemperature = Math.round(currentTemperature * (9 / 5) + 32);
    temperatureElement.innerHTML = `${fahrenheitTemperature}˚F`;
  }
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
  let stats = document.querySelector(".stats");
  let statsElements = document.createElement("div");
  stats.appendChild(statsElements);

  const wind = response.data.wind.speed;
  const humidity = response.data.main.humidity;
  statsElements.innerHTML = `Wind speed: ${wind} m/s<br>Humidity: ${humidity} %`;
}

let search = document.querySelector("button");
search.addEventListener("click", displayCity);

function currentPosition() {
  navigator.geolocation.getCurrentPosition(currentPositionCoords);
}

function currentPositionCoords(position) {
  let apiKey = "3fceae23dde22994db28dbf0244f6a96";
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(handleCurrentPosition);
}

function handleCurrentPosition(response) {
  const currentCity = {
    id: response.data.id,
    name: "Current location"
  };

  //setFavourites([currentCity].concat(favouriteCities));

  handleCityTemperature(response);
}

let currentLocation = document.querySelector(".currentLocation");
currentLocation.addEventListener("click", currentPosition);

let currentCityForcast = document.querySelector(".forcast");
let currentCityForcastElement = document.createElement("div");

function handleForcast(response) {
  let cityElement = currentCityForcastElement;
  currentCityForcastElement.innerHTML = `${response.data.list[3].main.temp}<br> ${response.data.list[0].dt_txt}`;
}

currentCityForcast.appendChild(currentCityForcastElement);

let body = document.querySelector("body");
let gitLink = document.createElement("a");
body.appendChild(gitLink);

gitLink.setAttribute("href", "https://github.com/Anitadrp/weather-app");
gitLink.setAttribute("target", "blank");
gitLink.innerHTML = "Open source code - Anitadrp";
