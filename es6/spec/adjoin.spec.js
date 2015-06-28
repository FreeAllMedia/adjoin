import adjoin from "../lib/adjoin.js";

const sinon = require("sinon");

describe("adjoin", () => {
	let wrappedFunction;

	describe("(static methods)", () => {
		describe(".before(originalFunction, beforeFunction, context)", () => {
			let originalFunction,
				beforeFunction,
				context;

			it("should return a function", () => {
				originalFunction = () => {};
				beforeFunction = () => {};

				wrappedFunction = adjoin.before(originalFunction, beforeFunction);

				(typeof wrappedFunction).should.equal("function");
			});

			describe("(synchronous mode)", () => {
				beforeEach(() => {
					originalFunction = sinon.spy(function originalFunction() {
						this.original = true;
					});

					beforeFunction = sinon.spy(function beforeFunction() {
						this.before = true;
					});

					context = {};

					wrappedFunction = adjoin.before(originalFunction, beforeFunction, context);
				});

				it("should not require context for synchronous wraps", () => {
					() => {
						wrappedFunction = adjoin.before(originalFunction, beforeFunction);
						wrappedFunction();
					}.should.not.throw();
				});

				it("should call before function first and then original function", () => {
					wrappedFunction();
					sinon.assert.callOrder(beforeFunction, originalFunction);
				});

				describe("(arguments)", () => {
					let someArguments;

					beforeEach(() => {
						someArguments = [1, 2, 3];
						wrappedFunction = adjoin.before(originalFunction, beforeFunction);
						wrappedFunction(...someArguments);
					});

					it("should pass arguments to the original function", () => {
						originalFunction.calledWithExactly(...someArguments).should.be.true;
					});

					it("should pass arguments to the before function", () => {
						beforeFunction.calledWithExactly(...someArguments).should.be.true;
					});
				});
			});


			describe("(asynchronous mode)", () => {
				beforeEach(() => {
					originalFunction = sinon.spy(function originalFunction(callback) {
						this.original = true;
						callback();
					});

					beforeFunction = sinon.spy(function beforeFunction(callback) {
						this.before = true;
						callback();
					});

					context = {};

					wrappedFunction = adjoin.before(originalFunction, beforeFunction, context);
				});

				it("should not require context for asynchronous wraps", done => {
					() => {
						wrappedFunction = adjoin.before(originalFunction, beforeFunction);
						wrappedFunction(done);
					}.should.not.throw();
				});

				it("should pass a provided context to the original function", done => {
					wrappedFunction(() => {
						context.original.should.be.true;
						done();
					});
				});

				it("should pass a provided context to the before function", done => {
					wrappedFunction(() => {
						context.before.should.be.true;
						done();
					});
				});

				it("should call before function first and then original function", done => {
					wrappedFunction(() => {
						sinon.assert.callOrder(beforeFunction, originalFunction);
						done();
					});
				});

				describe("(arguments)", () => {
					let someArguments;

					beforeEach(done => {
						originalFunction = sinon.spy(function originalFunction(one, two, three, callback) {
							callback();
						});

						beforeFunction = sinon.spy(function beforeFunction(one, two, three, callback) {
							callback();
						});
						someArguments = [1,2,3,done];
						wrappedFunction = adjoin.before(originalFunction, beforeFunction);
						wrappedFunction(...someArguments);
					});

					it("should pass arguments to the original function", () => {
						originalFunction.calledWithExactly(...someArguments).should.be.true;
					});

					it("should pass arguments to the before function", () => {
						const callback = someArguments.pop();
						beforeFunction.calledWith(...someArguments).should.be.true;
					});
				});
			});
		});

		describe(".after(originalFunction, afterFunction, context)", () => {
			let originalFunction,
				afterFunction,
				context;

			it("should return a function", () => {
				originalFunction = () => {};
				afterFunction = () => {};

				wrappedFunction = adjoin.after(originalFunction, afterFunction);

				(typeof wrappedFunction).should.equal("function");
			});

			describe("(synchronous mode)", () => {
				beforeEach(() => {
					originalFunction = sinon.spy(function originalFunction() {
						this.original = true;
					});

					afterFunction = sinon.spy(function afterFunction() {
						this.after = true;
					});

					context = {};

					wrappedFunction = adjoin.after(originalFunction, afterFunction, context);
				});

				it("should not require context for synchronous wraps", () => {
					() => {
						wrappedFunction = adjoin.after(originalFunction, afterFunction);
						wrappedFunction();
					}.should.not.throw();
				});

				it("should call after function first and then original function", () => {
					wrappedFunction();
					sinon.assert.callOrder(originalFunction, afterFunction);
				});

				describe("(arguments)", () => {
					let someArguments;

					beforeEach(() => {
						someArguments = [1, 2, 3];
						wrappedFunction = adjoin.before(originalFunction, afterFunction);
						wrappedFunction(...someArguments);
					});

					it("should pass arguments to the original function", () => {
						originalFunction.calledWith(...someArguments).should.be.true;
					});

					it("should pass arguments to the after function", () => {
						afterFunction.calledWithExactly(...someArguments).should.be.true;
					});
				});
			});


			describe("(asynchronous mode)", () => {
				beforeEach(() => {
					originalFunction = sinon.spy(function originalFunction(callback) {
						this.original = true;
						callback();
					});

					afterFunction = sinon.spy(function afterFunction(callback) {
						this.after = true;
						callback();
					});

					context = {};

					wrappedFunction = adjoin.after(originalFunction, afterFunction, context);
				});

				it("should not require context for asynchronous wraps", done => {
					() => {
						wrappedFunction = adjoin.after(originalFunction, afterFunction);
						wrappedFunction(done);
					}.should.not.throw();
				});

				it("should pass a provided context to the original function", done => {
					wrappedFunction(() => {
						context.original.should.be.true;
						done();
					});
				});

				it("should pass a provided context to the after function", done => {
					wrappedFunction(() => {
						context.after.should.be.true;
						done();
					});
				});

				it("should call original function first and then after function", done => {
					wrappedFunction(() => {
						sinon.assert.callOrder(originalFunction, afterFunction);
						done();
					});
				});

				describe("(arguments)", () => {
					let someArguments;

					beforeEach(done => {
						originalFunction = sinon.spy(function originalFunction(one, two, three, callback) {
							callback();
						});

						afterFunction = sinon.spy(function afterFunction(one, two, three, callback) {
							callback();
						});
						someArguments = [1, 2, 3, done];
						wrappedFunction = adjoin.after(originalFunction, afterFunction);
						wrappedFunction(...someArguments);
					});

					it("should pass arguments to the original function", () => {
						someArguments.pop(); // Remove callback for comparison
						originalFunction.calledWith(...someArguments).should.be.true;
					});

					it("should pass arguments to the after function", () => {
						afterFunction.calledWithExactly(...someArguments).should.be.true;
					});
				});
			});
		});
	});
});
