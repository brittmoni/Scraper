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


mongoose.connect("mongodb://localhost/Scraper", { useNewUrlParser: true });


app.get('/scraper', function(req, res){
  axios.get('https://www.huffpost.com').then(function(response){
    var $ = cheerio.load(response.data);

    $('div.card card--media-left').each(function(i, element){
      var result = {};

      result.headline = $(this).children('a')
        .text();
      result.summary = $(this).children('div')
        .children('div.card__headlines')
        .children('div.card__description')
        .children('a').text();
      result.link = $(this).children('a')
        .attr('href');

      db.Articles.create(result).then(function(dbArticles) {
        console.log(dbArticles);
      }).catch(function(err){
        console.log(err);
      });
    });
  });
});

app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
})