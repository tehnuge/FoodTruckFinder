var exports = module.exports = {}	

exports.isNumeric = function(n){
	return !isNaN(parseFloat(n)) && isFinite(n);
}