let apiKey = "23d542f35a564bd8824f6ff80d210e45";
let currentCity = "";
let lastCity = ""; 
let myCities = localStorage.getItem("myCities");
if (myCities==undefined){
    myCities=[];
}



function test(){
    console.log("TaDa");
    currentCity = document.getElementById("search-city").value;
    console.log("Current City!" + currentCity)
    saveCity(currentCity);
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial" + "&APPID=" + apiKey;
    fetch(queryURL)
    .then((response)=> {
        return response.json();
    })
    .then((response) => {
        console.log(response);
        console.log(response.dt);
        console.log(response.main.temp);
        console.log(response.wind.speed);
        console.log(response.main.humidity);
        let WeatherIcon="https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        document.getElementById("city").innerHTML= " 5- Day Forecast: " +currentCity; 

        document.getElementById("temp").innerHTML = "Temp: " + response.main.temp+" F"; 
        document.getElementById("wind").innerHTML = "Wind: " + response.wind.speed+" mph"; 
        document.getElementById("humidity").innerHTML ="Humidity: " + response.main.humidity+"%"; 
        document.getElementById("date").innerHTML = "Date: "+response.dt; 
        document.getElementById("icon").src=WeatherIcon;
 
        var myDate = new Date(response.dt *1000);
        //document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());
        document.getElementById("date").innerHTML = "Date: "+myDate.toGMTString(); 

    })
    
    getFiveDayForecast();

}
// 5 day forecast
let getFiveDayForecast = (event) => {
    let city = document.getElementById("search-city").value;
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&APPID=" + apiKey;
    let previousDay = 0;
    let day =1;
    fetch(queryURL)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
        for (let i = 0; i < response.list.length; i++) {
            let dayData = response.list[i];
            let date = dayData.dt_txt.split(" ");
            let time = date[1];
            date = date[0];

            if (dayData.dt >= previousDay) {
                previousDay = dayData.dt + 24*3600;
                console.log(dayData.dt_txt);
                console.log("Temp: " + dayData.main.temp);
                console.log("Humidity: " +dayData.main.humidity);
                console.log("The wind speed is: " + dayData.wind.speed);
                let WeatherIcon="https://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
                document.getElementById("icon"+day).src=WeatherIcon;
                document.getElementById(("temp"+day)).innerHTML = "Temp: " + dayData.main.temp+" F"; 
                document.getElementById(("wind"+day)).innerHTML = "Wind: " + dayData.wind.speed+" mph"; 
                document.getElementById(("humidity"+day)).innerHTML ="Humidity: " + dayData.main.humidity+"%"; 
                document.getElementById(("date"+day)).innerHTML = "Date: "+dayData.dt_txt; 
                day++;
            }
          
        }
    })
}
function saveCity(data){
    console.log("The data on saveCity "+ data);
    localStorage.setItem(data,data);
    
    if (!myCities.includes(data)){
        console.log("No data previosly stored of that city");
        myCities.push(data);
        localStorage.setItem("myCities", myCities);
        historyList()
    }
    else{
        console.log("The city was previosly stored");
    }
  
}
  
function historyList(){
    console.log("HistoryList was called");

    const historyList = document.querySelector(".history-list");
    historyList.innerHTML= "";
    console.log(myCities.length);
    console.log(myCities)
    for (let i=0; i< myCities.length; i++){
        var button= document.createElement("button");
        button.innerHTML= myCities[i];

        let body= document.getElementsByClassName("history-list")[0];
        body.appendChild(button);

        button.addEventListener("click", function() {
            document.getElementById("search-city").value= myCities[i];
            test();
        });
    }
}


function clearHistory()
{
    localStorage.clear();
    myCities = [];
    document.querySelector(".history-list").innerHTML ="";
    document.getElementById("search-city").value="";
}
document.getElementById("search-button").addEventListener("click", test);
document.getElementById("clear-button").addEventListener("click", clearHistory);
historyList();
