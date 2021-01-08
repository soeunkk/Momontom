const weather = document.querySelector(".js-weather"),
    weatherIcon = document.querySelector(".js-weatherIcon")
const API_KEY = "215b9881277a8a8110f65067b2f51de7";
const COORDS_LS = "coords";

function getWeather(lat, log) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json) {
        console.log(json);
        const temp = json.main.temp;
        const parsedtemp = Math.round(parseInt(temp));
        const contry = json.sys.country;
        const place = json.name;
        const currentweather = json.weather[json.weather.length-1].main;
        weather.innerHTML = `${currentweather}<br/>${parsedtemp}˚C @ ${place},${contry}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS_LS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();