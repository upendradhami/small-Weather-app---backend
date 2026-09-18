const express = require('express');
const getWeather = require('../Controllers/weatherController');
const router = express.Router();

router.route("/weather").get(getWeather);

module.exports = router;