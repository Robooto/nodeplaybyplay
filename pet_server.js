'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const petRoutes = require('./routes/pet_routes.js')(app);

const server = app.listen(3002, function () {
    console.log('Server running at http://127.0.0.1:3002/');
});