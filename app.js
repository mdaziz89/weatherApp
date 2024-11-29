const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios");
const exp = require("constants");
require("dotenv").config()
const apiKey = process.env.API_KEY

const PORT = process.env.PORT || 3000;

//middleware

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //parse form data

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/weather", (req, res) => {
  res.render("weather",{weather:null,error:null});
});

// handeling the post request
app.post("/weather", async (req, res) => {
  const city = req.body.city;
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;

    res.render("weather", {weather: weatherData})
    
  } catch (error) {
    res.render("weather", { weather: null, error: "City not found!" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
