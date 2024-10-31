const apiKey = '0215ca134b434b38b6373549243010'; // 여기에 WeatherAPI에서 발급받은 API 키를 입력하세요

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert("도시 이름을 입력하세요.");
        return;
    }

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&lang=ko`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("날씨 정보를 가져오는데 실패했습니다.");

        const data = await response.json();
        const current = data.current;
        const location = data.location;
        const astro = data.forecast.forecastday[0].astro;

        document.getElementById('location').textContent = `${location.name}, ${location.country}`;
        document.getElementById('temperature').textContent = `온도: ${current.temp_c}°C`;
        document.getElementById('description').textContent = `상태: ${current.condition.text}`;
        document.getElementById('icon').src = current.condition.icon;
        document.getElementById('icon').alt = current.condition.text;
        document.getElementById('feels-like').textContent = current.feelslike_c;
        document.getElementById('humidity').textContent = current.humidity;
        document.getElementById('wind-speed').textContent = current.wind_kph;
        document.getElementById('sunrise').textContent = astro.sunrise;
        document.getElementById('sunset').textContent = astro.sunset;

        document.getElementById('weather-result').style.display = "block";
    } catch (error) {
        alert("에러가 발생했습니다: " + error.message);
    }
}