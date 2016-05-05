'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dogs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const dogRoutes = require('./routes/dog_routes.js')(app);

var server = app.listen(3001, function() {
    console.log('Server running at http://127.0.0.1:3001/');
});