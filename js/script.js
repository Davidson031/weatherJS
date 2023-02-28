const apiKey = //CHAVE DA API OPENWEATHERMAP.ORG
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";


//seleção
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const watherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherData = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");
const suggestionsContainer = document.querySelector("#suggestions");
const suggestionsButtons = document.querySelectorAll("#suggestions button");


//funções

const toggleLoader = () =>{
    loader.classList.toggle("hide");
}

const hideInformation = () => { 
    errorMessageContainer.classList.add("hide");
    suggestionsContainer.classList.add("hide");
}

showErrorMessage = ()  => {
    errorMessageContainer.classList.remove("hide");
}

const getWeatherData  = async(city) => { 

    toggleLoader();

    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherUrl);

    const data = await res.json();

    toggleLoader();

    return data;

}
const showWeatherData = async (city) => {

    const data = await getWeatherData(city);

    if(data.cod === "400" || data.cod === "404"){
        showErrorMessage();
        return;
    }

    cityElement.innerHTML = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    watherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed}km/h`;

    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;





    weatherData.classList.remove("hide");

};


//eventos
searchBtn.addEventListener("click", (e) => {

    e.preventDefault();
    
    const city = cityInput.value;

    showWeatherData(city);

});

cityInput.addEventListener("keyup", (e) => {

    if(e.code === "Enter"){

        const city = e.target.value;

        showWeatherData(city);
    }
})

suggestionsButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        const city = btn.getAttribute("id");

        showWeatherData(city);
    });
});