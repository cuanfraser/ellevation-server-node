const express = require('express');
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/ellevation',
    { useNewUrlParser: true, useUnifiedTopology: true })


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'temporary secret string'
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./controllers/employee.controller')(app)
require('./controllers/manager.controller')(app)

app.listen(3000)