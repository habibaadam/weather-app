//Function for manipulating response from API
function getResponse(response) {
// Selecting HTML and changing value to actual real temperature
  let cityNow = document.querySelector("#city-now");
  cityNow.innerHTML = response.data.city;
  let weatherShowing = document.querySelector("#currentW");

//Selecting Html of weather description and changing value to actual real description
  let weatherDescription = document.querySelector("#describe");
  weatherDescription.innerHTML = response.data.condition.description;

//Selecting Html of humidity and changing value to actual real humidity
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

//Selecting Html of wind and changing value to actual real wind
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed}km/h`;

  //Selecting html of time and changing value to actual real time
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  time.innerHTML = betterDate(date);

//Selecting html of icon and changing value to actual real icon
  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img class="emot"
            src="${response.data.condition.icon_url}">`

  if (response.data && response.data.temperature && response.data.temperature.current !== undefined) {
    weatherShowing.innerHTML = Math.round(response.data.temperature.current);
  } else {
    //If the city is invalid or does not exist
    alert("Please enter a valid city name");
    weatherShowing.innerHTML = "✘";
  }
  getForecast(response.data.city);
}

function betterDate(date) {
// Changing dates to real time dates
let all_Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = all_Days[date.getDay()];
let hour = date.getHours();
let minute = date.getMinutes();

if (minute < 10) {
    minute = `0${minute}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${currentDay} ${hour}:${minute}`;
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

//function for getting forecast from api
function getForecast(city) {
  let apiKey = "80c24a3665db24tbfafc1c0035ca3o90";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function normalDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let all_Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return all_Days[day];
}
// function for formatting forecast according to days with a loop
function showForecast(response) {
  let formatted_forecast = "";

  response.data.daily.forEach(function(day, dayIndex) {
    if (dayIndex < 5) {
       formatted_forecast = formatted_forecast +
     `<div class="forecast-day">
            <div class="forecast-date">${normalDay(day.time)}</div>
            <div >
            <img class="forecast-icon"
            src="${day.condition.icon_url}" />
            </div>
            <div class="all_temperatures">
              <div class="forecast-temp">
                <strong>${Math.round(day.temperature.maximum)}° </strong>
              </div>
              <div class="forecast-temp">${Math.round(day.temperature.minimum)}°</div>
            </div>
          </div>`;
  }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = formatted_forecast
}
// Default city shown to user
citySearch("Paris");
