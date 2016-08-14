
var url = 'https://data.sfgov.org/resource/6a9r-agq8.json';
gMapsKey = 'AIzaSyD5vQG68S8OQc2Fdwz2oIDpdE91gd96Ua0';

$.ajax({
	type: 'GET',
	url: url,
	data: {
		$$app_token: 'RzO65y75nj0P8erDPoh90p2Go'
		//address: '100 SPEAR ST'
	},
	success: function(data){
		console.log(data)
	}
});
