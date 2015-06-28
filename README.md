# Adjoin.js [![npm version](https://img.shields.io/npm/v/adjoin.svg)](https://www.npmjs.com/package/adjoin) [![license type](https://img.shields.io/npm/l/adjoin.svg)](https://github.com/FreeAllMedia/adjoin.git/blob/master/LICENSE) [![npm downloads](https://img.shields.io/npm/dm/adjoin.svg)](https://www.npmjs.com/package/adjoin) ![ECMAScript 6 & 5](https://img.shields.io/badge/ECMAScript-6%20/%205-red.svg)

Quality-controlled component for adjoining one function to another in an Aspect-Oriented style.

```javascript
// ES6
import adjoin from "adjoin";

/**
 * Start with an empty context to exemplify
 */
let context = {};

/**
 * Start with a function that accepts zero or more arguments
 */
function originalFunction(argOne, argTwo) {
	this.original = argOne;
	// this.both was already set in beforeFunction
	this.both = this.both + argTwo;
}

/**
 * Create another function with the same
 * arguments and optional callback.
 */
function beforeFunction(argOne, argTwo) {
	this.before = argOne + 10;
	this.both = argOne + argTwo;
}

/**
 * Adjoin functions together into a new function
 */
const adjoinedFunction = adjoin.before(
	originalFunction,
	beforeFunction,
	context
);

/**
 * The adjoined function calls both functions
 * in the correct order, with the specified
 * arguments and context.
 */
adjoinedFunction(100, 200);

console.log(context); // {original:100, before:110, both:500}
```

# Quality and Compatibility

[![Build Status](https://travis-ci.org/FreeAllMedia/adjoin.png?branch=master)](https://travis-ci.org/FreeAllMedia/adjoin) [![Code Climate](https://codeclimate.com/github/FreeAllMedia/adjoin/badges/gpa.svg)](https://codeclimate.com/github/FreeAllMedia/adjoin) [![Dependency Status](https://david-dm.org/FreeAllMedia/adjoin.png?theme=shields.io)](https://david-dm.org/FreeAllMedia/adjoin?theme=shields.io) [![Dev Dependency Status](https://david-dm.org/FreeAllMedia/adjoin/dev-status.svg)](https://david-dm.org/FreeAllMedia/adjoin?theme=shields.io#info=devDependencies)

*Every build and release is automatically tested on the following platforms:*

![node 0.12.x](https://img.shields.io/badge/node-0.12.x-brightgreen.svg) ![node 0.11.x](https://img.shields.io/badge/node-0.11.x-brightgreen.svg) ![node 0.10.x](https://img.shields.io/badge/node-0.10.x-brightgreen.svg)
![iojs 2.x.x](https://img.shields.io/badge/iojs-2.x.x-brightgreen.svg) ![iojs 1.x.x](https://img.shields.io/badge/iojs-1.x.x-brightgreen.svg)


[![Sauce Test Status](https://saucelabs.com/browser-matrix/adjoin.svg)](https://saucelabs.com/u/adjoin)


*If your platform is not listed above, you can test your local environment for compatibility by copying and pasting the following commands into your terminal:*

```
npm install adjoin
cd node_modules/adjoin
gulp test-local
```

# Installation

Copy and paste the following command into your terminal to install Adjoin:

```
npm install adjoin --save
```

## Import / Require

```
// ES6
import adjoin from "adjoin";
```

```
// ES5
var adjoin = require("adjoin");
```

```
// Require.js
define(["require"] , function (require) {
    var adjoin = require("adjoin");
});
```

# Getting Started

Adjoin.js takes two functions and *adjoins* then together to form a new function that calls both with the same arguments, in order.

There are currently two ways to adjoin one function to another:

* `adjoin.before(originalFunction, beforeFunction, [context])`
* `adjoin.after(originalFunction, afterFunction, [context])`

Both methods support asynchronous functions, and node-style asynchronous functions with a callback as the last argument.

## adjoin.before()

Return an `adjoinedFunction` that first calls `beforeFunction`, then calls `originalFunction` with the supplied arguments. Synchronous and node-style asynchronous functions are supported.

**Synchronous Example:**

```javascript
// ES6
import adjoin from "adjoin";

/**
 * Start with an empty context to exemplify
 */
let context = {};

/**
 * Start with a function that accepts zero or more arguments
 */
function originalFunction(argOne, argTwo) {
	this.original = argOne;
	// this.both was already set in beforeFunction
	this.both = this.both + argTwo;
}

/**
 * Create another function with the same
 * arguments and optional callback.
 */
function beforeFunction(argOne, argTwo) {
	this.before = argOne + 10;
	this.both = argOne + argTwo;
}

/**
 * Adjoin functions together into a new function
 */
const adjoinedFunction = adjoin.before(
	originalFunction,
	beforeFunction,
	context
);

/**
 * The adjoined function calls both functions
 * in the correct order, with the specified
 * arguments and context.
 */
adjoinedFunction(100, 200);

console.log(context); // {original:100, before:110, both:500}
```

**Node-style asynchronous Example:**

``` javascript
// ES6
import adjoin from "adjoin";

/**
 * Start with an empty context to exemplify
 */
let context = {};

/**
 * Start with a function that accepts zero or 
 * more arguments, and optionally a callback
 */
function originalFunction(argOne, argTwo, callback) {
	this.original = argOne;
	this.both = argOne + argTwo;
	callback();
}

/**
 * Create another function with the same
 * arguments and optional callback.
 */
function beforeFunction(argOne, argTwo, callback) {
	this.before = argOne + 10;
	// this.both was already set in originalFunction
	this.both = this.both + argTwo;
	callback();
}

/**
 * Adjoin functions together into a new function
 */
const adjoinedFunction = adjoin.before(
	originalFunction,
	beforeFunction,
	context
);

/**
 * The adjoined function calls both functions
 * in the correct order, with the specified
 * arguments and context.
 */
adjoinedFunction(100, 200, () => {
	console.log(context); // {original:100, before:110, both:500}
});
```

## adjoin.after()

Return an `adjoinedFunction` that first calls `originalFunction`, then calls `afterFunction` with the supplied arguments. Synchronous and node-style asynchronous functions are supported.

**Synchronous Example:**

```javascript
// ES6
import adjoin from "adjoin";

/**
 * Start with an empty context to exemplify
 */
let context = {};

/**
 * Start with a function that accepts zero or more arguments
 */
function originalFunction(argOne, argTwo) {
	this.original = argOne;
	this.both = argOne + argTwo;
}

/**
 * Create another function with the same
 * arguments and optional callback.
 */
function afterFunction(argOne, argTwo) {
	this.after = argOne + 10;
	// this.both was already set in originalFunction
	this.both = this.both + argTwo;
}

/**
 * Adjoin functions together into a new function
 */
const adjoinedFunction = adjoin.after(
	originalFunction,
	afterFunction,
	context
);

/**
 * The adjoined function calls both functions
 * in the correct order, with the specified
 * arguments and context.
 */
adjoinedFunction(100, 200);

console.log(context); // {original:100, after:110, both:500}
```

**Node-style asynchronous Example:**

``` javascript
// ES6
import adjoin from "adjoin";

/**
 * Start with an empty context to exemplify
 */
let context = {};

/**
 * Start with a function that accepts zero or 
 * more arguments, and optionally a callback
 */
function originalFunction(argOne, argTwo, callback) {
	this.original = argOne;
	this.both = argOne + argTwo;
	callback();
}

/**
 * Create another function with the same
 * arguments and optional callback.
 */
function afterFunction(argOne, argTwo, callback) {
	this.after = argOne + 10;
	// this.both was already set in originalFunction
	this.both = this.both + argTwo;
	callback();
}

/**
 * Adjoin functions together into a new function
 */
const adjoinedFunction = adjoin.after(
	originalFunction,
	afterFunction,
	context
);

/**
 * The adjoined function calls both functions
 * in the correct order, with the specified
 * arguments and context.
 */
adjoinedFunction(100, 200, () => {
	console.log(context); // {original:100, after:110, both:500}
});
```

# How to Contribute

See something that could use improvement? Have a great feature idea?

You can submit your ideas through our [issues system](https://github.com/FreeAllMedia/adjoin/issues), or make the modifications yourself and submit them to us in the form of a [GitHub pull request](https://help.github.com/articles/using-pull-requests/).

We always aim to be friendly and helpful.

## Running Tests

It's easy to run the test suite locally, and *highly recommended* if you're using Adjoin.js on a platform we aren't automatically testing for.

```
npm test
```
