let currentCityScreen = document.querySelector(".currentCityScreen");
let currentCity = document.createElement("h1");
currentCityScreen.appendChild(currentCity);

currentCity.innerHTML = "hello";

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
