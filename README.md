# Adjoin.js [![npm version](https://img.shields.io/npm/v/adjoin.svg)](https://www.npmjs.com/package/adjoin) [![license type](https://img.shields.io/npm/l/adjoin.svg)](https://github.com/FreeAllMedia/adjoin.git/blob/master/LICENSE) [![npm downloads](https://img.shields.io/npm/dm/adjoin.svg)](https://www.npmjs.com/package/adjoin) ![ECMAScript 6 & 5](https://img.shields.io/badge/ECMAScript-6%20/%205-red.svg)

Quality-controlled component for adjoining one function to another in an Aspect-Oriented style.

## before

Return an `adjoinedFunction` that first calls `beforeFunction`, then calls `originalFunction` with the supplied arguments.

``` javascript
const adjoinedFunction = adjoin.before(
	originalFunction,
	beforeFunction,
	context
);
```

**Synchronous Example**

``` javascript
// var adjoin = require("adjoin")
import adjoin from "adjoin";

function beforeFunction(argument) {
  this.before = argument; // `this` is set to the provided context
}

function afterFunction(argument) {
	 this.after = argument; // `this` is set to the provided context
}

const context = {
	before: false,
	after: false
};

const adjoinedFunction = adjoin.before(
	afterFunction,
	beforeFunction,
	context
);

adjoinedFunction(true); // Argument is passed to both functions

context.before; // true
context.after; // true
```

**Asynchronous Example**

``` javascript
// var adjoin = require("adjoin")
import adjoin from "adjoin";

function beforeFunction(argument, done) {
  this.before = argument; // `this` is set to the provided context
  done();
}

function afterFunction(argument, done) {
	 this.after = argument; // `this` is set to the provided context
	 done();
}

const context = {
	before: false,
	after: false
};

const adjoinedFunction = adjoin.before(afterFunction, beforeFunction, context);

adjoinedFunction(true, () => {
	
});

context.before; // true
context.after; // true
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

## More insights

In order to say something, you should know that `adjoin()` ... (add your test here)

# How to Contribute

See something that could use improvement? Have a great feature idea? We listen!

You can submit your ideas through our [issues system](https://github.com/FreeAllMedia/adjoin/issues), or make the modifications yourself and submit them to us in the form of a [GitHub pull request](https://help.github.com/articles/using-pull-requests/).

We always aim to be friendly and helpful.

## Running Tests

It's easy to run the test suite locally, and *highly recommended* if you're using Adjoin.js on a platform we aren't automatically testing for.

```
npm test
```


### SauceLabs Credentials

We've setup our tests to automatically detect whether or not you have our saucelabs credentials installed in your environment (`process.env.SAUCE_USERNAME`).

If our saucelabs credentials are not installed, the tests are setup to automatically detect all browsers you have installed on your local system, then use them to run the tests.

#### Obtaining Our SauceLabs Credentials

If you'd like to develop Adjoin.js using SauceLabs, you need only create a new entry in our [issue tracker](https://github.com/FreeAllMedia/adjoin/issues) asking for our SauceLabs credentials.

We'll send over all credentials specific to this project so that you can perform comprehensive cross-platform tests.


