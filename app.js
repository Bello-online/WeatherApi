const express = require("express");
const https = require("https"); // Do nont have to install because it is a native node module
const { dirname } = require("path");
const bodyParser = require("body-parser");
const app = express();
import { apiKey } from './config.js';



app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile( __dirname + "/index.html");                
}) 

app.post("/",function(req,res){
const query = req.body.cityName;
const appid= apiKey;
const units = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appid+"&units= "+units +"";
https.get(url,function(response){  // https get function to access the data from the API.
    console.log(response.statusCode);

    response.on("data",function(data){   // The response when the site gets data with a call back function
       const weatherData = JSON.parse(data);  // Parsing the data from JSON from the API
       const temp = weatherData.main.temp;   // Extracting from the JSON
       const description = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
       
       res.write("<h1> The temperature in " + query + " is " + temp + " degree Celcius.</h1>");
       res.write("<p>The weather is currently " + description + "</p>");
       res.write("<img src =" + imageURL + " > ")
       res.send()
    })
}) 
})

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})