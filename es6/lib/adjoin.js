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
export default class Adjoin {
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
	static before(originalFunction, beforeFunction, context = {}) {
		return function wrapperFunction(...instanceArguments) {
			const lastArgument = instanceArguments[instanceArguments.length-1];
			const lastArgumentIsAFunction = (typeof lastArgument === "function");

			if (lastArgumentIsAFunction) {
				let beforeArguments = Array.from(instanceArguments);

				beforeArguments.pop();
				beforeArguments.push(() => {
					originalFunction.apply(context, instanceArguments);
				});

				beforeFunction.apply(context, beforeArguments);
			} else {
				beforeFunction.apply(context, instanceArguments);
				originalFunction.apply(context, instanceArguments);
			}
		};
	}

	static after(originalFunction, afterFunction, context = {}) {
		return function wrapperFunction(...instanceArguments) {
			const lastArgument = instanceArguments[instanceArguments.length-1];
			const lastArgumentIsAFunction = (typeof lastArgument === "function");

			if (lastArgumentIsAFunction) {
				let originalArguments = Array.from(instanceArguments);

				originalArguments.pop();
				originalArguments.push(() => {
					afterFunction.apply(context, instanceArguments);
				});

				originalFunction.apply(context, originalArguments);
			} else {
				originalFunction.apply(context, instanceArguments);
				afterFunction.apply(context, instanceArguments);
			}
		};
	}
}
