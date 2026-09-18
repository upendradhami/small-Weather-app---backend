const mongoose = require('mongoose');

const weatherModel = new mongoose.Schema({
  place: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  feelsLike: {
    type: Number,
    required: true 
  },
  precipitation: {
    type: Number,
    required: true
  },
  windSpeed: {
    type: Number,
    required: true  
  },
  weather: {
    type: String,
    required: true
  }
})


const Weather =  mongoose.model('Weather', weatherModel);

module.exports = Weather;