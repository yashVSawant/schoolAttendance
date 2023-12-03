const express = require('express');

const route = express.Router();

const controller = require('../constrollers/attendanceInfo');

route.get('/getStudents',controller.getstudents);

route.get('/getDate',controller.getDateInfo);

route.get('/getAttendance',controller.getMarkedAttendance);

route.get('/fetchedAttendance',controller.getFetchedAttendance);

route.post('/postStudent',controller.postStudent);

route.post('/postAttendance',controller.postDateInfo);

module.exports = route ;