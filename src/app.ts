// ###########################################
// CHUCK NORRIS API / FETCH API

const loadJokes: any = async (): Promise<any> =>  {

    // first, we use await to fetch the joke from the API
    try{
        const chuckNorrisFetch: Response = await fetch('https://api.chucknorris.io/jokes/random', {
            headers: {Accept: 'application/json'}
        });
    // Then await again here to parse the JSON response, this .json() also returns a promise
        const jokeData = await chuckNorrisFetch.json();
        const loadingElement = document.getElementById('loadingJoke');
        if (loadingElement) {
            loadingElement.innerHTML = jokeData.value;
        } else {
            console.log("Element with ID 'loadingJoke' not found");
        }
    } catch (error) {
        console.log(`Error fetching joke: ${error}`);
    };
};

document.getElementById('loadJokeBtn')?.addEventListener("click", loadJokes);


// ###########################################
// WEATHER API / FETCH API
// import dotenv from 'dotenv';
// dotenv.config();
// const apiKey = process.env.WEATHER_API_KEY;
// console.log(`API Key: ${apiKey}`); // For debugging purposes, remove in production

const date = document.getElementById('date');
const city = document.getElementById('city');
const temperature = document.getElementById('temp');
const weatherIcon = document.getElementById('temp-img');
const description = document.getElementById('description');
const tempMax = document.getElementById('temp-max');
const tempMin = document.getElementById('temp-min');

// create an array for months
const months: string[] = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let dateObj:Date = new Date();
let month:string = months[dateObj.getUTCMonth()];
let day = dateObj.getUTCDate() - 1; // Subtract 1 to get the previous day
let year = dateObj.getUTCFullYear();
if (date) {
    date.innerHTML = `${month} ${day}, ${year}`;
} else {
    console.log("Element with ID 'date' not found");
};

// not sure why we need this?
const app = document.getElementById('app');


const getWeather = async ():Promise<void> => {
    try {
        const searchBarElement = document.getElementById('search-bar-input') as HTMLInputElement | null;
        if (!searchBarElement) {
            console.log("Element with ID 'search-bar' not found");
            return;
        }
        const cityName: string = searchBarElement.value;
        const weatherFetch: Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=[YOUR-API-KEY]&units=metric`,
            {
                headers: {Accept: 'application/json'}
            });
        const weatherData = await weatherFetch.json();
        console.log(weatherData);

        // Check if weatherData has the expected structure
        if (!weatherData || weatherData.cod === '404' || !weatherData.sys) {
            console.log("Invalid weather data received:", weatherData);
            return;
        }

        if (city) {
            // Add country to the city name if available
            const countryCode = weatherData.sys?.country ? `, ${weatherData.sys.country}` : '';
            city.innerHTML = `${weatherData.name}${countryCode}`;
        } else {
            console.log("Element with ID 'city' not found");
        };
        if (description) {
            description.innerHTML = `${weatherData.weather[0].description}`;
        } else {
            console.log("Element with ID 'description' not found");
        }
        if (weatherIcon) {
            weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="${weatherData.weather[0].description}">`;
        }

        if (temperature) {
            temperature.innerHTML = `${Math.round(weatherData.main.temp)}°C`;
        } else {
            console.log("Element with ID 'temp' not found");
        }
        if (tempMax) {
            tempMax.innerHTML = `Max: ${Math.round(weatherData.main.temp_max)}°C`;
        } else {
            console.log("Element with ID 'temp-max' not found");
        }
        if (tempMin) {
            tempMin.innerHTML = `Min: ${Math.round(weatherData.main.temp_min)}°C`;
        } else {
            console.log("Element with ID 'temp-min' not found");
        }

    } catch (error) {
        console.log(`Error fetching weather data: ${error}`);
    }
}

getWeather();