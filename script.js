document.getElementById("getWeatherBtn").addEventListener("click", function () {
    const city = document.getElementById("cityInput").value;
    const apiKey = "cae2f88dea4012dac3a7baa30b718675";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract temperature, humidity, wind speed, and date/time data
            const temperatureData = [];
            const humidityData = [];
            const windSpeedData = [];
            const dateTimeData = [];

            // Loop through the API response to extract data for each day
            for (let i = 0; i < data.list.length; i += 8) { // Data is provided every 3 hours, so we skip by 8 to get daily data
                const dayData = data.list[i];
                const date = new Date(dayData.dt * 1000); // Convert Unix timestamp to date

                // Extract temperature (in Celsius), humidity (%), and wind speed (in m/s)
                const temperature = dayData.main.temp;
                const humidity = dayData.main.humidity;
                const windSpeed = dayData.wind.speed;

                // Push data into arrays
                temperatureData.push(temperature);
                humidityData.push(humidity);
                windSpeedData.push(windSpeed);
                dateTimeData.push(date.toLocaleString()); // Convert date to a human-readable format
            }

            // Extract current weather data
            const currentWeather = data.list[0]; // Assuming the current weather data is at the beginning of the list
            const currentTemperature = currentWeather.main.temp;
            const currentWeatherDescription = currentWeather.weather[0].description;
            const currentHumidity = currentWeather.main.humidity;
            const currentWindSpeed = currentWeather.wind.speed;
            const currentDateTime = new Date(currentWeather.dt * 1000).toLocaleString(); // Convert date to a human-readable format

            // Update the HTML to display weather information
            const weatherInfo = document.getElementById("weatherInfo");
            weatherInfo.innerHTML = `
                <h2>Current Weather in ${city}</h2>
                <p>Current Temperature: ${currentTemperature} °C</p>
                <p>Weather Condition: ${currentWeatherDescription}</p>
                <p>Humidity: ${currentHumidity}%</p>
                <p>Wind Speed: ${currentWindSpeed} m/s</p>
                <p>Date and Time: ${currentDateTime}</p>
            `;

            // Create the temperature, humidity, wind speed, and date/time charts using Chart.js
            createTemperatureChart(temperatureData);
            createHumidityChart(humidityData);
            createWindSpeedChart(windSpeedData);
            createDateAndTimeChart(dateTimeData);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
});

// Rest of the code for createTemperatureChart, createHumidityChart, createWindSpeedChart, and createDateAndTimeChart functions...
function createTemperatureChart(temperatureData) {
    const temperatureChartCanvas = document.getElementById("temperatureChart");

    new Chart(temperatureChartCanvas, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatureData,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createHumidityChart(humidityData) {
    const humidityChartCanvas = document.getElementById("humidityChart");

    new Chart(humidityChartCanvas, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Humidity (%)',
                data: humidityData,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100 // Set the maximum value for humidity (usually 100%)
                }
            }
        }
    });
}
// Rest of the code remains the same as in your previous code...

function createWindSpeedChart(windSpeedData) {
    const windSpeedChartCanvas = document.getElementById("windSpeedChart");

    new Chart(windSpeedChartCanvas, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Wind Speed (m/s)',
                data: windSpeedData,
                borderColor: 'rgba(255, 159, 64, 1)', // You can adjust the color as needed
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
