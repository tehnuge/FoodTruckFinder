
var url = 'https://data.sfgov.org/resource/6a9r-agq8.json';
gMapsKey = 'AIzaSyD5vQG68S8OQc2Fdwz2oIDpdE91gd96Ua0';
var lat, lng, map;
var markers = [];
var infoWindows = [];
var center = {lat: 37.756367, lng: -122.44370};

//37.781007, -122.457992

//handle address
$("#submit").click(function(){
	getLocation($('#address').val());
});

function getLocation(address){
	$.ajax({
		type: 'GET',
		url: 'https://maps.googleapis.com/maps/api/geocode/json',
		data: {
			key: gMapsKey,
			address: address
		},
		success: function(data){
			lat = data.results[0].geometry.location.lat;
			lng = data.results[0].geometry.location.lng;

			// Clear markers and empty markers array if there is stuff inside already
			for (var i = 0; i < markers.length; i++) {
				markers[i].setMap(null)
			}
			markers = [];
			infoWindows = [];

			getTrucks(lat, lng);
		}
	})
};
function addInfoWindow(i){
	infoWindows[i].open(map, markers[i])

}
function getTrucks(lat, lng){
	$.ajax({
		type: 'GET',
		url: url,
		data: {
			$$app_token: 'RzO65y75nj0P8erDPoh90p2Go',
			$where: 'within_circle(location,'+ lat + ', '+ lng + ', 1600)'
		},
		success: function(data){
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				(function(){
					markers.push(new google.maps.Marker({
									position: {lat: parseFloat(data[i].latitude), lng: parseFloat(data[i].longitude)},
									map: map,
									title: data[i].applicant
								}));

					var contentString = data[i].applicant + data[i].dayshours + data[i].fooditems
					infoWindows.push(new google.maps.InfoWindow({
    									content: contentString
  								}));

					markers[i].addListener('click', function(i){
						addInfoWindow(i)
					});

					console.log(data[i].applicant, parseFloat(data[i].latitude), parseFloat(data[i].longitude))
				})();
			}
		}
	});
}

//Google Maps init
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: center
  });
}


//Mobile screen detection
function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map");

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  } else {
    mapdiv.style.width = '600px';
    mapdiv.style.height = '800px';
  }
}