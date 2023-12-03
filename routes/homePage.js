const express = require('express');

const route = express.Router();

const controller = require('../constrollers/homePage');

route.get('/attendance',controller.getHomePage);

module.exports = route;