const weather = require('../Model/weather.js');

  function getWeatherDescription(code) {

    if (code === 0) {
      return "Clear sky";
    }

    if (code === 1 || code === 2 || code === 3) {
      return "Cloudy";
    }

    if (code === 45 || code === 48) {
      return "Fog";
    }

    if (code >= 51 && code <= 57) {
      return "Drizzle";
    }

    if (code >= 61 && code <= 67) {
      return "Rain";
    }

    if (code >= 71 && code <= 77) {
      return "Snow";
    }

    if (code >= 80 && code <= 82) {
      return "Rain showers";
    }

    if (code >= 95) {
      return "Thunderstorm";
    }

    return "Unknown";
  }


const getWeather = async(req,res) => {
   const city = req.query.city;
  
    if (city == null || !city) {
      res.send("please enter valid city name");
    }
  
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&countryCode=NP`
    );
  
    const geoData = await geoResponse.json();
    if (!geoData.results || geoData.results.length === 0) {
      return res.status(404).send({ error: 'City not found' });
    }
  
    // finding location as 
    const location = geoData.results[0];
    const latitude = location.latitude;
    const longitude = location.longitude;
  
  
    // fetching some weather info from api as below 
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code&timezone=auto`);
  
    const weatherData = await weatherResponse.json();
  
  
  
    const weatherDescription =
      getWeatherDescription(weatherData.current.weather_code);
  
    const resObj = {
      place: location.name,
      country: location.country,
      temperature: weatherData.current.temperature_2m,
      humidity: weatherData.current.relative_humidity_2m,
      feelsLike: weatherData.current.apparent_temperature,
      precipitation: weatherData.current.precipitation,
      windSpeed: weatherData.current.wind_speed_10m,
      weather: weatherDescription
    }
  
    const weatherUpdate = await weather.create(resObj); // saving the data to the database
  
    res.json(resObj);
  
}


module.exports = getWeather;