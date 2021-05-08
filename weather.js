const API_KEY = "60272f3f7f690ff77d7d87c109257d34";
const COORDS = "coords"
const loadedCoords = localStorage.getItem(COORDS)
const weather = document.querySelector(".weather");


function savePostion(coordsObj){
    
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json()
    })
    .then(function(json){
        const tempareture = json.main.temp;
        const name = json.name;
        console.log(json)

        weather.innerHTML= `${name} 　/　  ${tempareture} ˚C`
    })
}

function handleGeoSucces(positon){
    console.log(positon)
    const latitude = positon.coords.latitude;
    const longitude = positon.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
    };
    savePostion(coordsObj)
    getWeather(latitude,longitude)
}

function handleGeoError(){
    console.log("Sorry")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
    if(loadedCoords === null){
        askForCoords()
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }
}

function init(){
    loadCoords()
}

init()
