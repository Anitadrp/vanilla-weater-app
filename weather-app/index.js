let currentCityScreen = document.querySelector(".currentCityScreen");
let currentCity = document.createElement("h1");
currentCityScreen.appendChild(currentCity);
let currentTime = document.createElement("p");
currentCityScreen.appendChild(currentTime);

currentCity.innerHTML = "hello";

let date = new Date();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[date.getDay()];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[date.getMonth()];

currentTime.innerHTML = `${day}, ${date.getDate()} ${month} ${date.getFullYear()}<br>${date.toLocaleTimeString()}`;

function displayCity(event) {
  event.preventDefault();
  const citySearch = document.querySelector(".citySearch");
  const currentCity = citySearch.value;
  citySearch.value = "";

  alert(currentCity);
}

let search = document.querySelector("button");
search.addEventListener("click", displayCity);

let body = document.querySelector("body");
let gitLink = document.createElement("a");
body.appendChild(gitLink);

gitLink.setAttribute("href", "https://github.com/Anitadrp/weather-app");
gitLink.setAttribute("target", "blank");
gitLink.innerHTML = "Open source code - Anitadrp";
