const API_KEY = '6ab7d31c7e5ed05122193f9e8702a394';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'
let spinner=document.getElementById('spinner');
const LAT = 'lat=';
const LON = '&lon=';
let lat,lon;
const successCallback = (position) => {
    console.log(position);
    spinner.classList.toggle('d-none');
    console.log('Lat: '+position.coords.latitude);
    console.log('Lon: '+position.coords.longitude);
    lon=position.coords.longitude;
    lat=position.coords.latitude;
    searchLat.value=lat;
    searchLon.value=lon;
    
    myFunction();
    spinner.classList.toggle('d-none');
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
let historyEl=document.getElementById('history');
const BASE_URL_2 = '&appid=';
const userCardTemplate = document.querySelector("[data-user-template]");
let input =document.getElementById('input');
let temperature=document.getElementById('temperature');
let humidity=document.getElementById('humidity');
let precipitation=document.getElementById('precipitation');
let place=document.getElementById('location');
let bg=document.getElementById('background');
const searchLat = document.querySelector("[data-search-lat]");
const searchLon = document.querySelector("[data-search-lon]");
const searchButton = document.querySelector("[data-search-button]");
let timeBack=document.getElementById('timeBack');
let tim=document.getElementById('hello');




function display_history(data){
    let timeEl=document.createElement('p');
    let location_p=document.createElement('p');
    let description_p=document.createElement('p');
    let temp_p=document.createElement('p');
    let humidity_p=document.createElement('p');
    timeEl.textContent='Time: '+(data.time.split('T')).join(" ")+' GMT';


    location_p.textContent="Location: "+data.location;
    description_p.textContent=data.description;
    temp_p.textContent='Temperature: '+data.temperature;
    humidity_p.textContent='Humidity: '+data.humidity;
    let d=document.createElement('div');
    let D=document.createElement('div');
    D.classList.add('col-12', 'col-lg-4', 'col-xl-3','p-3');
    d.classList.add('box','shadow');
    D.appendChild(d);
    d.appendChild(timeEl);
    d.appendChild(description_p);
    d.appendChild(location_p);
    d.appendChild(humidity_p);
    d.appendChild(temp_p);



    tim.appendChild(D);

}


let h=localStorage.getItem('history');
console.log(h);
if(h!==null){
h=JSON.parse(h);}
else{
    h=[];
}


const API_URL = BASE_URL + LAT + lat + LON + lon + BASE_URL_2 + API_KEY + '&units=metric';
console.log(lat,lon);





console.log(h);




console.log('done');
function myFunction(){
    lat= searchLat.value;
    lon= searchLon.value;
    if (lat==="" || lon===''){
        alert('Latitude or Longitude is missing!!');
        return ;
    }
    spinner.classList.toggle('d-none');
    const API_URL = BASE_URL + LAT + lat + LON + lon + BASE_URL_2 + API_KEY + '&units=metric';
    console.log(lat,lon);


    fetch(API_URL,{method:'GET'})
        .then(function(response){return response.json()})
        .then(function(jsonData){
            console.log(jsonData);
            console.log(h);
            h.push(
                {
                    location:jsonData.name,
                    description:jsonData.weather[0].description.toUpperCase(),
                    temperature:jsonData.main.temp+'˚c',
                    humidity:jsonData.main.humidity,
                    time: new Date(),

                });
                console.log(h);

            localStorage.setItem('history',JSON.stringify(h));
            console.log(localStorage.getItem('history'));
             h=localStorage.getItem('history');
             console.log(JSON.parse(h).length);
             console.log(2+2);
             console.log(h);
            h=JSON.parse(h);
            temperature.textContent='Temperature: '+jsonData.main.temp+'˚c';
            console.log(jsonData.main.humidity);
            humidity.textContent='Humidity:'+jsonData.main.humidity;
            precipitation.textContent=jsonData.weather[0].description.toUpperCase();
            place.textContent = 'Location: '+ jsonData.name;
            bg.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+jsonData.name+"')";
            spinner.classList.toggle('d-none');
        });
}
console.log(h.length);

for (let i=0;i<h.length;i++){
    
    display_history(h[h.length-i-1]);

}
document.getElementById('clearBtn').onclick=function(){
    localStorage.removeItem('history');
    tim.textContent='Cleared';

}










