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
    })

}
document.getElementById("search-button").addEventListener("click", test);