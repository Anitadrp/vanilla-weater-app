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
  let apiUrl;
  if ("id" in city) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&units=metric&appid=${apiKey}`;
  } else {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=${apiKey}`;
  }

  axios.get(apiUrl).then(handleCityTemperature);
}

function handleCityTemperature(response) {
  let cityElement = currentCity;
  cityElement.innerHTML = response.data.name;
  //alert(currentCity);
  let cityTemperature = response.data.main.temp;
  currentTemperature = Math.round(cityTemperature);
  temperatureChange();
  descriptionCurrentWeather(response);
}

let currentTemperature = 0;
let isCelcius = true;

function temperatureChange() {
  let temperature = document.querySelector(".temperature");
  if (isCelcius) {
    temperature.innerHTML = `${currentTemperature}˚C`;
  } else {
    let fahrenheitTemperature = Math.round(currentTemperature * (9 / 5) + 32);
    temperature.innerHTML = `${fahrenheitTemperature}˚F`;
  }
}

function descriptionCurrentWeather(response) {
  let description = document.querySelector(".description");
  const wind = response.data.wind.speed;
  const humidity = response.data.main.humidity;
  description.innerHTML = `Wind speed: ${wind} m/s<br>Humidity: ${humidity} %`;
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

let body = document.querySelector("body");
let gitLink = document.createElement("a");
body.appendChild(gitLink);

gitLink.setAttribute("href", "https://github.com/Anitadrp/weather-app");
gitLink.setAttribute("target", "blank");
gitLink.innerHTML = "Open source code - Anitadrp";
