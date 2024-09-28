const apiKey = '3ed3aacf5211021317f738ce19512545';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationOutput = document.getElementById('location');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const windSpeed = document.getElementById('windSpeed');
const weatherIcon = document.getElementById('weatherIcon');

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    } 
});

resetButton.addEventListener('click', resetInfo)

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const city = data.name;
            const country = data.sys.country;
            locationOutput.textContent = `${city}, ${country}`;
            description.textContent = data.weather[0].description.replace(/^\w/, (c) => c.toUpperCase());;
            temperature.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
            windSpeed.textContent = `Wind Speed: ${(data.wind.speed*3.6).toFixed(2)} km/h` ;
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
            weatherIcon.src = iconUrl;
            weatherIcon.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Location not found. Please enter a valid city');
        });
}

function resetInfo(){
    locationInput.value = '';
    locationOutput.textContent = '';
    description.textContent = '';
    temperature.textContent = '';
    windSpeed.textContent = '';
    weatherIcon.style.display = 'none';
}