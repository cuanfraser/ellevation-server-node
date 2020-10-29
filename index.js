const express = require('express');
const app = express()
const mongoose = require('mongoose')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// app.get('/test', (req, res) =>
//     res.json(data)    
// )

// app.post('/add', (req, res) => {
//     const body = req.body
//     data.push(body)
//     console.log(body)
//     res.json(body)
// })


app.listen(3000)