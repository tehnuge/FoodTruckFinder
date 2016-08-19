var expect = require('chai').expect;
var appFile = require('../bin/bundle.js');

var assert = require('assert');


describe('Food truck finder', function() {
	it('Should let the user know when the results are empty', function() {
		var address = '';
		var result = appFile.validateInputs(address, '3');
		expect(result).to.equal(0);
	})
	it('should not let the users get querys without entering a number range', function() {
		var address = "0th and irving, san francisco, ca"
		var result = appFile.validateInputs(address, '')
		expect(result).to.equal(0);
	})
	it('should do something of some sort'), function() {
		expect(0).to.equal(0);
	}
})
