const express = require("express");
const https = require("node:https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){

  res.sendFile(__dirname + "/weather.html");

});

app.post("/",(req,res) =>{
  console.log(req.body.cityName);

  const metric =  req.body.cityName;

      https.get('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=69e86860e092609c210281c0abc6aab2&units='+metric+'#', (response) => {
  console.log('statusCode:', response.statusCode);

  response.on('data', (d) => {
    const weatherData = JSON.parse(d)
    console.log(weatherData);
    const temp = weatherData.main.temp;
    const desc = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    console.log("Temperature:",temp,"Celcius");
    console.log("Descripiton:",desc);
    const imgURL =    "https://openweathermap.org/img/wn/"+ icon + "@2x.png"
    res.write("<h1>The temperature at London is "+ temp + " degree celsius</h1>");
    res.write("<p>The weather is currently " + desc + " in your area");
    res.write("<img src=" + imgURL + "/>");
    res.send();
  });

  }).on('error', (e) => {
  console.error(e);
}); 

})


app.listen(3000, function(){
    console.log("The server is now running at port 3000")
})