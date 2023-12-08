let Form1 = document.querySelector("#search-check");
let apiKey = "80c24a3665db24tbfafc1c0035ca3o90";

//Function for manipulating response from API
function getResponse(response) {
  // Selecting HTML and changing value to actual real temperature
  let weatherShowing = document.querySelector("#currentW");
  if (response.data && response.data.temperature && response.data.temperature.current !== undefined) {
    weatherShowing.innerHTML = Math.round(response.data.temperature.current);
  } else {
    //If the city is invalid or does not exist
    alert("Please enter a valid city name")
    weatherShowing.innerHTML = "NaN";

  }
}

Form1.addEventListener("submit", function switchUp(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-me");
  let cityNow = document.querySelector("#city-now");
  //Changing H1 according to search input
  cityNow.innerHTML = searchInput.value;
  if (searchInput.value) {
    let url = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}`;
    axios.get(url).then(getResponse);
  }});

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
