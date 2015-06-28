/**
 * # Adjoin.js
 *
 * Quality controlled component for adjoining one function to another in an Aspect-Oriented style.
 *
 * @example
 *
 * **Synchronous Example:**
 *
 * ```javascript
 * import adjoin from "adjoin";
 *
 * function beforeFunction(...arguments) {
 *   this.before = true;
 * }
 *
 * function afterFunction(...arguments) {
 * 	 this.after = true;
 * }
 *
 * const context = {};
 *
 * const adjoinedFunction = adjoin.before(afterFunction, beforeFunction, context);
 *
 * adjoinedFunction();
 *
 * context.before; // true
 * context.after; // true
 * ```
 *
 * @class Adjoin
 * @constructor
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Adjoin = (function () {
	function Adjoin() {
		_classCallCheck(this, Adjoin);
	}

	_createClass(Adjoin, null, [{
		key: "before",

		/**
   * Adjoin a function to execute *before* another.
   *
   * @method before
   * @static
   * @param  {function} originalFunction 	The function to run after the beforeFunction completes.
   * @param  {function} beforeFunction   	The function to run before the originalFunction starts.
   * @param  {Object} context				Set the `this` context for each of the function to be run in.
   * @return {function}                  	The newly adjoined functions, wrapped in a new function.
   */
		value: function before(originalFunction, beforeFunction) {
			var context = arguments[2] === undefined ? {} : arguments[2];

			return function wrapperFunction() {
				for (var _len = arguments.length, instanceArguments = Array(_len), _key = 0; _key < _len; _key++) {
					instanceArguments[_key] = arguments[_key];
				}

				var lastArgument = instanceArguments[instanceArguments.length - 1];
				var lastArgumentIsAFunction = typeof lastArgument === "function";

				if (lastArgumentIsAFunction) {
					var beforeArguments = Array.from(instanceArguments);

					beforeArguments.pop();
					beforeArguments.push(function () {
						originalFunction.apply(context, instanceArguments);
					});

					beforeFunction.apply(context, beforeArguments);
				} else {
					beforeFunction.apply(context, instanceArguments);
					originalFunction.apply(context, instanceArguments);
				}
			};
		}
	}, {
		key: "after",
		value: function after(originalFunction, afterFunction) {
			var context = arguments[2] === undefined ? {} : arguments[2];

			return function wrapperFunction() {
				for (var _len2 = arguments.length, instanceArguments = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					instanceArguments[_key2] = arguments[_key2];
				}

				var lastArgument = instanceArguments[instanceArguments.length - 1];
				var lastArgumentIsAFunction = typeof lastArgument === "function";

				if (lastArgumentIsAFunction) {
					var originalArguments = Array.from(instanceArguments);

					originalArguments.pop();
					originalArguments.push(function () {
						afterFunction.apply(context, instanceArguments);
					});

					originalFunction.apply(context, originalArguments);
				} else {
					originalFunction.apply(context, instanceArguments);
					afterFunction.apply(context, instanceArguments);
				}
			};
		}
	}]);

	return Adjoin;
})();

exports["default"] = Adjoin;
module.exports = exports["default"];