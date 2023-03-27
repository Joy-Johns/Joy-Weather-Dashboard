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
        document.getElementById("temp").innerHTML = response.main.temp; 
        document.getElementById("wind").innerHTML = response.wind.speed; 
        document.getElementById("humidity").innerHTML = response.main.humidity; 
        document.getElementById("date").innerHTML = response.dt; 
    })

}
document.getElementById("search-button").addEventListener("click", test);

