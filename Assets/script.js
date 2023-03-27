let apiKey = "23d542f35a564bd8824f6ff80d210e45";
let currentCity = "";
let lastCity = ""; 



function test(){
    console.log("TaDa");
    currentCity = document.getElementById("search-city").value;
    console.log("Current City!" + currentCity)
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
        document.getElementById("temp").innerHTML = "Temp: " + response.main.temp+" F"; 
        document.getElementById("wind").innerHTML = "Wind: " + response.wind.speed+" mph"; 
        document.getElementById("humidity").innerHTML ="Humidity: " + response.main.humidity+"%"; 
        document.getElementById("date").innerHTML = "Date: "+response.dt; 
        var myDate = new Date(response.dt *1000);
        //document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());
        document.getElementById("date").innerHTML = "Date: "+myDate.toGMTString(); 

    })

}
document.getElementById("search-button").addEventListener("click", test);

