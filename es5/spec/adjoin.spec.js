"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _libAdjoinJs = require("../lib/adjoin.js");

var _libAdjoinJs2 = _interopRequireDefault(_libAdjoinJs);

var sinon = require("sinon");

describe("adjoin", function () {
	var wrappedFunction = undefined;

	describe("(static methods)", function () {
		describe(".before(originalFunction, beforeFunction, context)", function () {
			var originalFunction = undefined,
			    beforeFunction = undefined,
			    context = undefined;

			it("should return a function", function () {
				originalFunction = function () {};
				beforeFunction = function () {};

				wrappedFunction = _libAdjoinJs2["default"].before(originalFunction, beforeFunction);

				(typeof wrappedFunction).should.equal("function");
			});

			describe("(synchronous mode)", function () {
				beforeEach(function () {
					originalFunction = sinon.spy(function originalFunction() {
						this.original = true;
					});

					beforeFunction = sinon.spy(function beforeFunction() {
						this.before = true;
					});

					context = {};

					wrappedFunction = _libAdjoinJs2["default"].before(originalFunction, beforeFunction, context);
				});

				it("should not require context for synchronous wraps", function () {
					(function () {
						wrappedFunction = _libAdjoinJs2["default"].before(originalFunction, beforeFunction);
						wrappedFunction();
					}).should.not["throw"]();
				});

				it("should call before function first and then original function", function () {
					wrappedFunction();
					sinon.assert.callOrder(beforeFunction, originalFunction);
				});

				describe("(arguments)", function () {
					var someArguments = undefined;

					beforeEach(function () {
						someArguments = [1, 2, 3];
						wrappedFunction = _libAdjoinJs2["default"].before(originalFunction, beforeFunction);
						wrappedFunction.apply(undefined, _toConsumableArray(someArguments));
					});

					it("should pass arguments to the original function", function () {
						originalFunction.calledWithExactly.apply(originalFunction, _toConsumableArray(someArguments)).should.be["true"];
					});

					it("should pass arguments to the before function", function () {
						beforeFunction.calledWithExactly.apply(beforeFunction, _toConsumableArray(someArguments)).should.be["true"];
					});
				});
			});

			describe("(asynchronous mode)", function () {
				beforeEach(function () {
					originalFunction = sinon.spy(function originalFunction(callback) {
						this.original = true;
						callback();
					});

					beforeFunction = sinon.spy(function beforeFunction(callback) {
						this.before = true;
						callback();
					});

					context = {};

					wrappedFunction = _libAdjoinJs2["default"].before(originalFunction, beforeFunction, context);
				});

				it("should not require context for asynchronous wraps", function (done) {
					(function () {
						wrappedFunction = _libAdjoinJs2["default"].before(originalFunction, beforeFunction);
						wrappedFunction(done);
					}).should.not["throw"]();
				});

				it("should pass a provided context to the original function", function (done) {
					wrappedFunction(function () {
						context.original.should.be["true"];
						done();
					});
				});

				it("should pass a provided context to the before function", function (done) {
					wrappedFunction(function () {
						context.before.should.be["true"];
						done();
					});
				});

				it("should call before function first and then original function", function (done) {
					wrappedFunction(function () {
						sinon.assert.callOrder(beforeFunction, originalFunction);
						done();
					});
				});

				describe("(arguments)", function () {
					var someArguments = undefined;

					beforeEach(function (done) {
						originalFunction = sinon.spy(function originalFunction(one, two, three, callback) {
							callback();
						});

						beforeFunction = sinon.spy(function beforeFunction(one, two, three, callback) {
							callback();
						});
						someArguments = [1, 2, 3, done];
						wrappedFunction = _libAdjoinJs2["default"].before(originalFunction, beforeFunction);
						wrappedFunction.apply(undefined, _toConsumableArray(someArguments));
					});

					it("should pass arguments to the original function", function () {
						originalFunction.calledWithExactly.apply(originalFunction, _toConsumableArray(someArguments)).should.be["true"];
					});

					it("should pass arguments to the before function", function () {
						var callback = someArguments.pop();
						beforeFunction.calledWith.apply(beforeFunction, _toConsumableArray(someArguments)).should.be["true"];
					});
				});
			});
		});

		describe(".after(originalFunction, afterFunction, context)", function () {
			var originalFunction = undefined,
			    afterFunction = undefined,
			    context = undefined;

			it("should return a function", function () {
				originalFunction = function () {};
				afterFunction = function () {};

				wrappedFunction = _libAdjoinJs2["default"].after(originalFunction, afterFunction);

				(typeof wrappedFunction).should.equal("function");
			});

			describe("(synchronous mode)", function () {
				beforeEach(function () {
					originalFunction = sinon.spy(function originalFunction() {
						this.original = true;
					});

					afterFunction = sinon.spy(function afterFunction() {
						this.after = true;
					});

					context = {};

					wrappedFunction = _libAdjoinJs2["default"].after(originalFunction, afterFunction, context);
				});

				it("should not require context for synchronous wraps", function () {
					(function () {
						wrappedFunction = _libAdjoinJs2["default"].after(originalFunction, afterFunction);
						wrappedFunction();
					}).should.not["throw"]();
				});

				it("should call after function first and then original function", function () {
					wrappedFunction();
					sinon.assert.callOrder(originalFunction, afterFunction);
				});

				describe("(arguments)", function () {
					var someArguments = undefined;

					beforeEach(function () {
						someArguments = [1, 2, 3];
						wrappedFunction = _libAdjoinJs2["default"].before(originalFunction, afterFunction);
						wrappedFunction.apply(undefined, _toConsumableArray(someArguments));
					});

					it("should pass arguments to the original function", function () {
						originalFunction.calledWith.apply(originalFunction, _toConsumableArray(someArguments)).should.be["true"];
					});

					it("should pass arguments to the after function", function () {
						afterFunction.calledWithExactly.apply(afterFunction, _toConsumableArray(someArguments)).should.be["true"];
					});
				});
			});

			describe("(asynchronous mode)", function () {
				beforeEach(function () {
					originalFunction = sinon.spy(function originalFunction(callback) {
						this.original = true;
						callback();
					});

					afterFunction = sinon.spy(function afterFunction(callback) {
						this.after = true;
						callback();
					});

					context = {};

					wrappedFunction = _libAdjoinJs2["default"].after(originalFunction, afterFunction, context);
				});

				it("should not require context for asynchronous wraps", function (done) {
					(function () {
						wrappedFunction = _libAdjoinJs2["default"].after(originalFunction, afterFunction);
						wrappedFunction(done);
					}).should.not["throw"]();
				});

				it("should pass a provided context to the original function", function (done) {
					wrappedFunction(function () {
						context.original.should.be["true"];
						done();
					});
				});

				it("should pass a provided context to the after function", function (done) {
					wrappedFunction(function () {
						context.after.should.be["true"];
						done();
					});
				});

				it("should call original function first and then after function", function (done) {
					wrappedFunction(function () {
						sinon.assert.callOrder(originalFunction, afterFunction);
						done();
					});
				});

				describe("(arguments)", function () {
					var someArguments = undefined;

					beforeEach(function (done) {
						originalFunction = sinon.spy(function originalFunction(one, two, three, callback) {
							callback();
						});

						afterFunction = sinon.spy(function afterFunction(one, two, three, callback) {
							callback();
						});
						someArguments = [1, 2, 3, done];
						wrappedFunction = _libAdjoinJs2["default"].after(originalFunction, afterFunction);
						wrappedFunction.apply(undefined, _toConsumableArray(someArguments));
					});

					it("should pass arguments to the original function", function () {
						someArguments.pop(); // Remove callback for comparison
						originalFunction.calledWith.apply(originalFunction, _toConsumableArray(someArguments)).should.be["true"];
					});

					it("should pass arguments to the after function", function () {
						afterFunction.calledWithExactly.apply(afterFunction, _toConsumableArray(someArguments)).should.be["true"];
					});
				});
			});
		});
	});
});