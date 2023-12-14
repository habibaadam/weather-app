//Function for manipulating response from API
function getResponse(response) {
  // Selecting HTML and changing value to actual real temperature
  let cityNow = document.querySelector("#city-now");
  cityNow.innerHTML = response.data.city;
  let weatherShowing = document.querySelector("#currentW");
  if (response.data && response.data.temperature && response.data.temperature.current !== undefined) {
    weatherShowing.innerHTML = Math.round(response.data.temperature.current);
  } else {
    //If the city is invalid or does not exist
    alert("Please enter a valid city name")
    weatherShowing.innerHTML = "✘";

  }
}

function citySearch(city) {
  let apiKey = "80c24a3665db24tbfafc1c0035ca3o90";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(url).then(getResponse);
}

function switchUp(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-me");
  citySearch(searchInput.value);
}
let Form1 = document.querySelector("#search-check");
Form1.addEventListener("submit", switchUp);

// Default city shown to user
citySearch("Accra");

// Changing dates to real time dates
let rightNow = new Date();
let day = rightNow.getDay();
let all_Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = all_Days[day];
let hour = rightNow.getHours();
let minute = rightNow.getMinutes();

if (minute < 10) {
    minute = `0${minute}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

let realTime = document.querySelector(".real");
realTime.innerHTML = `${currentDay} ${hour}:${minute}`;
