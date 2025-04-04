document.addEventListener('DOMContentLoaded', () => {
    // you can only grab the input element once the dom has been loaded

    //step 1
    const cityInput = document.querySelector('#city-input');
    const weatherbtn = document.querySelector('#get-weather-btn');
    const weatherinfo = document.querySelector('#weather-info');
    const cityNameDisplay = document.querySelector('#city-name');
    const temperatureDisplay = document.querySelector('#temperature');
    const descriptionDisplay = document.querySelector('#description');
    const errorMessage = document.querySelector('#error-message');

    const API_KEY = "e674e508c4fcf130160eb36c02af3af7"; //env variables

    weatherbtn.addEventListener('click', async () =>{ //step2
        const city = cityInput.value.trim();
        if(!city) return;

        // making a request doesnt guarantee an immediate fulfilment of the request instead making an api call to the server might cause some server error

        //server/database is always in another continent

        try {
          const weatherData =   await fetchWeatherData(city);
          displayWeatherData(weatherData);
        } catch (error) {
            showError()
        }


    });

    async function fetchWeatherData(city){ //step3
        //gets the data 

        //step5

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(response)
        console.log(typeof response);

        if(!response.ok){
            throw new Error("City Not Found..");
        }

        const data = await response.json();
        return data;
    }


    function displayWeatherData(weatherData){ //step 4
       
        console.log(weatherData);
        const { name, main, weather } = weatherData; // Fixed incorrect variable

        cityNameDisplay.textContent = name; // Fixed variable name
        temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
        descriptionDisplay.textContent = `Description: ${weather[0].description}`;

        // Show weather info and hide error message
        weatherinfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');

    }

    function showError(){
        errorMessage.classList.remove('hidden');
        weatherinfo.classList.add('hidden');
    }

});