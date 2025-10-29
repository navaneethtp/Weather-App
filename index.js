const apiKey =  config.apiKey;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";


const LocationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = LocationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;


    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
            localStorage.setItem("lastCity", data.name);
          })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
        }

        window.addEventListener("load", () => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
        fetchWeather(savedCity);
    }
});
