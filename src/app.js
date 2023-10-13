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
  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${result}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let tempCel = document.querySelector(".temperature");
  tempCel.innerHTML = temp;
}

let current = document.querySelector(".current");
current.addEventListener("click", showCurrentCityTemp);

function showCurrentCityTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showCurrentTemp);
  }
}

function showCurrentTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let tempC = document.querySelector(".temperature");
  tempC.innerHTML = temp;
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = city;
}
