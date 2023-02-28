const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

    const url = "https://api.openweathermap.org/data/2.5/forecast?&id=1185241&lang=en&units=metric&APPID=a5691a6fdfebcdea5d860ecb4c3fbd86";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.list[0].main.temp;
            const weatherDescription = weatherData.list[0].weather[0].description;
            res.write("<p>The weather is currently "+weatherDescription+".</p>");
            res.write("<h1>The temperature in Dhaka is "+temp+" degrees Celsius.</h1>");
            res.send(); 
        })
    })
})

app.listen(3000, function(){
    console.log("Server is up and running at port 3000!");
})