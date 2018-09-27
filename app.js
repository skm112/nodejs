var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var countryRoute = require("./server/api/country.api.js");
// access controls----------------------------------------------
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    );
    // res.header('Access-Control-Allow-Headers', 'Content-Type','Authorization');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    next();
});

//connectDB-----------------------------------
mongoose.connect("mongodb://localhost/countrydb");

//bparser-----------------------------
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/country', countryRoute);

app.listen(3000);
console.log("Server is running at PORT:3000");