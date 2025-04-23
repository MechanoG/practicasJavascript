//WHEATER APP

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "4794c8388e16b61280577dd2edf248e1";

weatherForm.addEventListener("submit", async event =>{

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData =await getWeatherData(city);
            displayWeatherInfo(weatherData);


        }catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please enter a city");
    }

});

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response =await fetch(apiUrl);

    if (!response){
        throw new Error("No se pudo obtener la informacion del clima");
    }

    return await response.json();
}

function displayWeatherInfo(data){

    const {name: city,
           main:{temp, humidity},
           weather:[{description,
           id}]}=data;

    card.textContent="";
    card.style.display ="flex";
}

function getWeatherEmoji(weatherId){

}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display ="flex";
    card.appendChild(errorDisplay);

}