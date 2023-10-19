let now = new Date();
let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = daysOfWeek[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}

let h2Date = document.querySelector("#date");
h2Date.innerHTML = `${day} ${hour}:${min}`;

let search = document.querySelector("button");
search.addEventListener("click", searchForCity);

function searchForCity(event) {
  event.preventDefault();
  let city = document.querySelector(".city");
  let result = city.value;
  let h1 = document.querySelector("h1");
  h1.innerHTML = result;
  let apiKey = "f0t6f37fo7eacab2cf93452fbe48b35c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${result}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  console.log(response.data);
  let temp = Math.round(response.data.temperature.current);
  let tempCel = document.querySelector(".temperature");
  tempCel.innerHTML = temp;
}

let current = document.querySelector(".current");
current.addEventListener("click", showCurrentCityTemp);

function showCurrentCityTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "f0t6f37fo7eacab2cf93452fbe48b35c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function showCurrentTemp(response) {
  let temp = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let tempC = document.querySelector(".temperature");
  tempC.innerHTML = temp;
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = city;
}
