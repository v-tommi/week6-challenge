function getLocation() {
    let loc = document.querySelector('#searchbox').value;
    let appid = '5b363f0d85d1d8e70ad27ba598ac067c';
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${loc}&appid=${appid}`;
    //let onecallURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${appid}`
    axios.get(url)
        .then(Response => {
            let result = Response.data;
            
            console.log(Response.data);
        }), err => {
            console.log(err);
        };
};

function getWeather() {
    //console.log(getLocation)
    //let lat = loc.lat;
    //let lon = loc.lon
    //let appid = '5b363f0d85d1d8e70ad27ba598ac067c';
    //let onecallURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${onecallURL}`
}

const myCardEl = document.querySelector('.forecast');
//const forecast5Days = for(let i = 0; i < 4; i++){

//}
function createCard() {

}
document.querySelector('.searchbtn').onclick = getLocation
//document.querySelector('.searchbtn').addEventListener('click', getWeather)

