const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req,res){
    cityName = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/forecast?&q="+cityName+"&lang=en&units=metric&APPID=a5691a6fdfebcdea5d860ecb4c3fbd86";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.list[0].main.temp;
            const weatherDescription = weatherData.list[0].weather[0].description;
            const weatherIcon = weatherData.list[0].weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";

            res.write("<h1>The temperature in "+cityName+" is "+temp+" degrees Celsius.</h1>");
            res.write("<img src="+imageUrl+" alt='WeatherCondition'></img><p>The weather is currently "+weatherDescription+".</p>");
            res.send(); 
        })
    })
})

app.listen(3000, function(){
    console.log("Server is up and running at port 3000!");
})