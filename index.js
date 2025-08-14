const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "31781faf0cf2ea1a4615a12d33e3c2a2"; //put your api key here

weatherForm.addEventListener("submit", async event => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError("Failed to fetch weather data");
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; //api url

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("City not found");
    
    return await response.json();
  } catch (error) {
    throw error;
  }
}

function displayWeatherInfo(data) {
  const { name, main, weather } = data;
  const temperature = Math.round(main.temp);
  const weatherDescription = weather[0].description;
  const weatherEmoji = getWeatherEmoji(weather[0].id);

  card.innerHTML = `
    <h2>${name}</h2>
    <p>${weatherEmoji} ${weatherDescription}</p>
    <p>🌡️ ${temperature}°C</p>
  `;
  card.style.display = "block";
}

function getWeatherEmoji(weatherID) {
  if (weatherID >= 200 && weatherID < 300) return "⛈️"; // Thunderstorm
  if (weatherID >= 300 && weatherID < 500) return "🌧️"; // Drizzle
  if (weatherID >= 500 && weatherID < 600) return "🌦️"; // Rain
  if (weatherID >= 600 && weatherID < 700) return "❄️"; // Snow
  if (weatherID >= 700 && weatherID < 800) return "🌫️"; // Atmosphere
  if (weatherID === 800) return "☀️"; // Clear sky
  if (weatherID > 800) return "☁️"; // Clouds
  return "❓";
}

function displayError(message) {
  card.innerHTML = `<p class="errorDisplay">${message}</p>`;
  card.style.display = "block";
}
