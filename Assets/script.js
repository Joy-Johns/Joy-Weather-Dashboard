let apiKey = "23d542f35a564bd8824f6ff80d210e45";
let currentCity = "";
let lastCity = ""; 

function test(){
    console.log("TaDa");
    currentCity = document.getElementById("search-city").value;
    console.log("Current City!" + currentCity)
}
document.getElementById("search-button").addEventListener("click", test);