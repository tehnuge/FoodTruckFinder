var $ = require('jquery'),
	App = require('./app.js'),
	url = 'https://maps.googleapis.com/maps/api/js',
	key = 'AIzaSyD5vQG68S8OQc2Fdwz2oIDpdE91gd96Ua0',
	fullUrl = url + '?key=' + key;

$.getScript(fullUrl, function(){
	App.initMap();
});
