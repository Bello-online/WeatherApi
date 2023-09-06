require("dotenv").config();
const express = require("express");
const https = require("https"); // Do nont have to install because it is a native node module
const { dirname } = require("path");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile( __dirname + "/index.html");                
}) 

app.post("/",function(req,res){
const query = req.body.cityName;
const appid= process.env.API_KEY;
const units = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appid;
https.get(url,function(response){  // https get function to access the data from the API.
    console.log(response.statusCode);

    response.on("data",function(data){   // The response when the site gets data with a call back function
       const weatherData = JSON.parse(data);  // Parsing the data from JSON from the API
       console.log(weatherData);
       const temp = weatherData.main.temp;   // Extracting from the JSON
       const description = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
       
    //    res.write("<h1> The temperature in " + query + " is " + temp + " degree Celcius.</h1>");
    //    res.write("<p>The weather is currently " + description + "</p>");
    //    res.write("<img src =" + imageURL + " > ")
    let responseHTML = 
    ` <div class="response-container">
        <h2 class="response-title"> Weather in ${query}</h2>
        <p class="response-text"> Temperature: ${temp}°C </p>
        <p class="response-text"> Weather : ${description} </p>
        <img class="weather-icon" src="${imageURL}" alt="Weather Icon">
    </div
    `;
       res.send(responseHTML)
    })
}) 
})

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})