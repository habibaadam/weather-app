let Form1 = document.querySelector("#search-check");
let apiKey = "80c24a3665db24tbfafc1c0035ca3o90";

//Function for manipulating response from API
function getResponse(response) {
  // Selecting HTML and changing value to actual real temperature
  if (response.data && response.data.temperature && response.data.temperature.current !== undefined) {
    let weatherShowing = document.querySelector("#currentW");
    weatherShowing.innerHTML = Math.round(response.data.temperature.current);
  } else {
    alert("Please enter a valid city");
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

let realTime = document.querySelector(".real");
realTime.innerHTML = `${currentDay} ${hour}:${minute}`;
