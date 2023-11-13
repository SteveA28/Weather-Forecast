const apiKey = "14d8473e21c5f34b7190f01235b678ca";

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const currentTemperatureElement =
        document.getElementById("currentTemperature");

      const currentTemperature = celsiusToFahrenheit(
        data.list[0].main.temp - 273.15
      ).toFixed(2);
      const humidity = data.list[0].main.humidity;
      const windSpeed = data.list[0].wind.speed;

      const currentDate = new Date();
      const formattedDate = `${currentDate.toDateString()} ${currentDate.toLocaleTimeString()}`;

      currentTemperatureElement.innerHTML = `
        <h2>Current Weather</h2>
        <span class="date">${formattedDate}</span>
        <span class="temperature">${currentTemperature}°F</span>
        <span class="humidity">Humidity: ${humidity}%</span>
        <span class="wind">Wind: ${windSpeed} m/s</span>
      `;

      const forecast = data.list
        .filter((_, index) => index % 8 === 0)
        .slice(0, 5);

      forecast.forEach((day, index) => {
        const dayElement = document.getElementById(`day${index + 1}`);
        const date = new Date(day.dt * 1000);
        const iconUrl = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;

        const temperatureFahrenheit = celsiusToFahrenheit(
          day.main.temp - 273.15
        ).toFixed(2);
        const humidity = day.main.humidity;
        const windSpeed = day.wind.speed;

        dayElement.innerHTML = `
            <span>${date.toDateString()}</span>
            <img src="${iconUrl}" alt="${day.weather[0].description}">
            <span class="temperature">${temperatureFahrenheit}°F</span>
            <span class="description">${day.weather[0].description}</span>
            <span class="humidity">Humidity: ${humidity}%</span>
            <span class="wind">Wind: ${windSpeed} m/s</span>
          `;
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const cityInput = document.getElementById("cityInput").value;
    fetchWeatherData(cityInput);
  });

const defaultCity = "Miami";
fetchWeatherData(defaultCity);
