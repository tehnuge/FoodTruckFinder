var expect = require('chai').expect;
var appFile = require('../bin/bundle.js');

var assert = require('assert');


describe('Food truck finder', function() {
	it('Should let the user know when the results are empty', function() {
		var address = '';
		var result = appFile.validateInputs(address, '');
		expect(result).to.equal(0);
	})
})
