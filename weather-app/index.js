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
