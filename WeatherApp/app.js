const input = document.querySelector(".input");
const temperature = document.querySelector(".temp");
const describe = document.querySelector(".describe");
const cityName = document.querySelector(".city");
const hmdt = document.querySelector("#hmd-value");
const wp = document.querySelector("#wp-value");
const search = document.querySelector(".search-btn");


let data = {};

async function getWeather(city) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d479cdd2cc0579a7d000e1adab44d88b&units=metric`);
    data = await response.json();

    if(data.cod === '404'){
        alert(`Enter a valid city name.`);
        return;
    }
    
    temperature.innerHTML = `${data.main.temp}&deg;C`;
    describe.innerHTML = data.weather[0].description;
    cityName.innerHTML = data.name;
    hmdt.innerHTML = `${data.main.humidity}%`;
    wp.innerHTML = `${data.wind.speed}m/s`;

    input.value = "";
}

search.addEventListener('click', function(e) {

    e.preventDefault();

    let city = input.value;

    getWeather(city);

});



