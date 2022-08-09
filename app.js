const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "5544d7fd1dea418a8ac2dda4dd5b30e8";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

  async function getData() {
    try{
      const resolved = await axios.get(url);
      const weatherData = resolved.data;
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const descp = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.render("search",{
        title: query,
        temp:temp,
        type:descp,
        image:imageURL});
    }
    catch(err){
      res.sendFile(__dirname+"/error.html");
    }
  }
  getData();
});


app.listen(3000, function(){
  console.log("Running");
});
