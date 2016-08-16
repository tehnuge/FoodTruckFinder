var $ = require('jquery');
var utils =require('./utils.js')
var exports = module.exports = {}	

var SFGovUrl = 'https://data.sfgov.org/resource/6a9r-agq8.json',
	SFGovKey = 'RzO65y75nj0P8erDPoh90p2Go',
	gMapsUrl = 'https://maps.googleapis.com/maps/api/geocode/json',
	gMapsKey = 'AIzaSyD5vQG68S8OQc2Fdwz2oIDpdE91gd96Ua0',
	lat, lng, map, infowindow, range,
	markers = [],
	center = {lat: 37.756367, lng: -122.44370},
	NanDiv = document.getElementById("Nan"),
	noResultsDiv = document.getElementById("noResults");


// Google Maps initialization
exports.initMap = function() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: center
  });
}


// Add event handlers for input fields
$("#userInputs").keypress(function( event ) {
	var inputAddress = $('#address').val(),
		inputRange = $('#range').val();
  if (event.which == 13) {
  		validateInputs(inputAddress, inputRange);
  	}
  });

$("#submit").click(function() {
	var inputAddress = $('#address').val(),
		inputRange = $('#range').val();
	validateInputs(inputAddress, inputRange);
});

var validateInputs = function(inputAddress, inputRange) {
	noResultsDiv.style.display = 'none';
	NanDiv.style.display = 'none';
	if(inputRange !== null && utils.isNumeric(inputRange)){
		range = inputRange * 1609;
	}
	else{
		NanDiv.style.display = 'block';
		return 0;
	}
	return getLocation(inputAddress);
}

// Get lat and lng coordinates of address from Google Maps API
var getLocation = function(address) {
	$.ajax({
		type: 'GET',
		url: gMapsUrl,
		data: {
			key: gMapsKey,
			address: address
		},
		success: function(data) {
			lat = data.results[0].geometry.location.lat;
			lng = data.results[0].geometry.location.lng;

			// Clear markers and empty markers array if a query was made already
			for (var i = 0; i < markers.length; i++) {
				markers[i].setMap(null)
			}
			markers = [];

			return getTrucks(lat, lng);
		}
	})
};

// Run address through SF OpenData API
var getTrucks = function(lat, lng) {
	$.ajax({
		type: 'GET',
		url: SFGovUrl,
		data: {
			$$app_token: SFGovKey,
			$where: 'within_circle(location,'+ lat + ', '+ lng + ', '+ range +')'
		},
		success: function(data) {
			// Let user know if no results returned
			if(data.length === 0){
				noResultsDiv.style.display = 'block';
			}
			for (let i = 0; i < data.length; i++) {
					markers.push(new google.maps.Marker({
									position: {lat: parseFloat(data[i].latitude), lng: parseFloat(data[i].longitude)},
									map: map,
									title: data[i].applicant
								}));

					markers[i].addListener('click', function(){
						let contentString = '<b>' + data[i].applicant 
											+':</b> <br /> Hours: ' + data[i].dayshours
							 				+ '<br /> Details: ' +data[i].fooditems;
						if(infowindow){
							infowindow.close();
						}
						infowindow = new google.maps.InfoWindow({
	    									content: contentString
	  								});
						infowindow.open(map, markers[i]);
					});
			}
		}
	});
	return markers
}
