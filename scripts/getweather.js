const apiKey = 'd8a51f6fd2b2380924ecdc95827c5994'; 

async function getWeatherData() {
    try {
        // Latitude and longitude coordinates for Monash University, Clayton
        const lat = 37.907803;
        const lon = 145.133957;
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await response.json();
        
        if (data.cod !== 200) {
            alert(data.message);
            return;
        }

        document.getElementById('temperature').innerText = `Temperature: ${Math.round(data.main.temp)/10}°C`;
        document.getElementById('description').innerText = `${data.weather[0].description}`;
    } catch (error) {
        console.log('Error fetching weather data:', error);
    }
}

// Call the function to fetch weather data when the page loads
window.onload = getWeatherData;
