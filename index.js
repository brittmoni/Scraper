var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs  = require('express-handlebars');

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;


var app = express();


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });