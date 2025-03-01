var date = new Date();
var day = date.getDay();
var month = date.getMonth();
getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, () => {
            document.getElementById("body").style.filter = 'blur(0rem)';
        });
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    getName(latitude, longitude)
}
async function getName(latitude, longitude) {
    var access_key = 'fc3a65fc9ebd7761b6cd0379e6cb3775'
    var url = `https://api.openweathermap.org/geo/1.0/reverse?lat=` + latitude + `&lon=` + longitude + `&limit=5&appid=` + access_key;
    var res = await fetch(url);
    var data = await res.json();
    var location = data[0].name.split(" ")[0];
    fetchData(location);
    document.getElementById("body").style.filter = 'blur(0rem)';
}

function findWeather() {
    var location = document.getElementById("search").value;
    fetchData(location)
}
async function fetchData(location) {
    var url = `https://api.weatherapi.com/v1/current.json?key=1c63857a8e0548f9a1a152750210909&q=` + location + `&aqi=yes`;
    var res = await fetch(url);
    var data = await res.json();
    if(res.status == 200){
        setValues(data);
    }
    else{
        var tags = document.getElementsByClassName('reset');
        for (let index = 0; index < tags.length; index++) {
            tags.item(index).innerHTML = ""
        }
        document.getElementById("name").innerHTML = "Location not Found";
    }
}
function setValues(data) {
    var setter = document.getElementById("temp_c");
    setter.innerHTML = data.current.temp_c + `&#176`;

    setter = document.getElementById('name');
    setter.innerHTML = data.location.name;

    setter = document.getElementById("region");
    setter.innerHTML = `&nbsp;` +  data.location.region + `, ` + data.location.country;
    setter = document.getElementById("feelslike_c");
    setter.innerHTML = `Feels like ` + data.current.feelslike_c + `&#176`;

    setter = document.getElementById("condition");
    setter.innerHTML = data.current.condition.text;

    setter = document.getElementById("cloud");
    setter.innerHTML = data.current.cloud + `%`;

    setter = document.getElementById("humidity");
    setter.innerHTML = data.current.humidity + `%`;

    setter = document.getElementById("wind_kph");
    setter.innerHTML = data.current.wind_kph + ` Km/h ` + data.current.wind_dir;

    setter = document.getElementById("gust_kph");
    setter.innerHTML = data.current.gust_kph + ` Km/h`;

    setter = document.getElementById("precip_mm");
    setter.innerHTML = data.current.precip_mm + `mm`;

    setter = document.getElementById("pressure_mb");
    setter.innerHTML = data.current.pressure_mb + `mb`;

    setter = document.getElementById("vis_km");
    setter.innerHTML = data.current.vis_km + ` KM`;

    setter = document.getElementById("uv");
    setter.innerHTML = data.current.uv + ` `;

}


switch(month){
    case 0: month = "January"; break;
    case 1: month = "February"; break;
    case 2: month = "March"; break;
    case 3: month = "April"; break;
    case 4: month = "May"; break;
    case 5: month = "June"; break;
    case 6: month = "July"; break;
    case 7: month = "August"; break;
    case 8: month = "September"; break;
    case 9: month = "October"; break;
    case 10: month = "November"; break;
    case 11: month = "December"; break;
}
switch(day){
    case 0: day = "Sunday"; break;
    case 1: day = "Monday"; break;
    case 2: day = "Tuesday"; break;
    case 3: day = "Wednesday"; break;
    case 4: day = "Thursday"; break;
    case 5: day = "Friday"; break;
    case 6: day = "Saturday"; break;
}
document.getElementById('date').innerHTML = 
date.getHours()+`:`+date.getMinutes()+` - ` +  day + `, ` + date.getDate() + ` ` + month + ` ` + date.getFullYear();
