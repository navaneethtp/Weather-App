const apiKey = "ddfc87a55fa1ca801eb7ce8d76a918cb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const LocationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

searchButton.addEventListener("click", () => {
  const location = LocationInput.value;
  fetchWeather(location);
});

async function fetchWeather(location) {
  const response = await fetch(
    `${apiUrl}${location}&appid=${apiKey}&units=metric`
  );

  if (response.status === 404) {
    alert("City not found. Please try again.");
    return;
  }

  const data = await response.json();
  console.log(data);
  locationElement.textContent = data.name;
  temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
  descriptionElement.textContent = data.weather[0].description;
  localStorage.setItem("lastCity", data.name);
}

window.addEventListener("load", () => {
  const savedCity = localStorage.getItem("lastCity");
  if (savedCity) {
    fetchWeather(savedCity);
  }
});
