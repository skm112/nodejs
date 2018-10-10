var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var countryRoute = require("./server/api/country.api.js");
var productRoute = require("./server/api/product.api");
var path=require("path");
app.use(express.static(path.join(__dirname, 'uploads')))
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
const db=require("./setups/myurl").mongoURL1

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected successfully..."))
    .catch(err => console.log(err));

//bparser-----------------------------
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/country', countryRoute);
app.use('/product',productRoute)

app.listen(3000);
console.log("Server is running at PORT:3000");