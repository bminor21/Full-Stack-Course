var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
//var pug = require('pug');

var app = express();

app.use( function(req,res,next){
//  console.log('Time', Date.now());
  next();
});

/* View Engine */
// app.set( 'view engine', 'pug');
app.set( 'view engine', 'ejs' );
app.set('views', path.join(__dirname, 'views'));

/* Middleware */
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.static(path.join(__dirname, 'public')));

/* Routing */
app.get( '/', function( req, res ){
  res.render('index', {
    title: "The title is showing",
    showTitle : true,
    people: ['John', 'Steve', 'Brett']
  });
});

app.get( '/about', function( req, res ){
  res.render('about');
});

app.get( '/contact', function( req, res ){
  res.render('contact');
});


app.listen(3000);
console.log("Server running on 3000");

module.exports = app;
