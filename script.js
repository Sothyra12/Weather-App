const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const API_KEY = 'adcb58ad52a2cb44fc4f045561a91a0e';
    const city = document.querySelector('.search-box input').value;

    if (city == '') {
        alert('Please enter a city name');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(res => res.json()).then(json => {

        if (json.cod == '404') {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }
        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const img = document.querySelector('.weather-box img');
        const temp = document.querySelector('.weather-box .temperature');
        const desc = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                img.src = 'images/clear.png';
                break;

            case 'Rain':
                img.src = 'images/rain.png';
                break;

            case 'Snow':
                img.src = 'images/snow.png';
                break;

            case 'Clouds':
                img.src = 'images/cloud.png';
                break;

            case 'Mist':
                img.src = 'images/mist.png';
                break;

            case 'Haze':
                img.src = 'images/mist.png';
                break;

            default:
                img.src = 'images/cloud.png';
        }

        temp.innerHTML =`${parseInt(json.main.temp)}<span>°C</span>`;
        desc.innerHTML =`${json.weather[0].description}`;
        humidity.innerHTML =`${json.main.humidity}%`;
        wind.innerHTML =`${parseInt(json.wind.speed)}Km/h`;

    });
});
