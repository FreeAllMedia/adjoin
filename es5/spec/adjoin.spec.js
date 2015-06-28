"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _libAdjoinJs = require("../lib/adjoin.js");

var _libAdjoinJs2 = _interopRequireDefault(_libAdjoinJs);

describe("Adjoin", function () {
	var component = undefined;

	before(function () {
		component = new _libAdjoinJs2["default"]();
	});

	it("should say something", function () {
		component.saySomething().should.equal("Something");
	});
});