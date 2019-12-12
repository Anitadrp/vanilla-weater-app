//alert("hello");
function displayTime() {
  let currentCityScreen = document.querySelector(".currentCityScreen");
  let currentTime = document.createElement("p");
  currentCityScreen.appendChild(currentTime);

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
}
