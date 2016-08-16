var $ = require('jquery');
var App = require('./app.js');

$.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyD5vQG68S8OQc2Fdwz2oIDpdE91gd96Ua0", function(){
	App.initMap();
   alert("Script loaded but not necessarily executed.");

});