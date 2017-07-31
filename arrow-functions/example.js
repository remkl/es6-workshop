// Arrow functions provide a short, terser sytnax used to replace the 'function' keyword
// Arrow functions are anonymous functions

// simple example
var foo = function() {}
function foo () {}

const foo = () => {}






// returning value
function returnVal() {
	return 'hey'
}
const returVal = () => {
	return 'hey'
}
const returnNum = () => 'hey' // Arrow functions without the {} after the => have an implicit return




function returnObj(arg) {
	return { key: arg }
}
const returnObj = (arg) => ({ key: arg }) // Arrow functions that implicitly return an object need to be wrapped in (). const returnObj = (arg) => {key: arg} is invalid because JavaScript thinks {} is the start of the function body, rather than an object literal

const returnObj = arg => ({ key: arg }) // when we only have 1 argument, we can ommit the ()



// Useful scenarios
  // Callbacks
promise.then(function(val)
  { return val }
)
  // vs
promise.then(val => val)

// Maintaining the value of 'this' - Arrow functions do not get a 'this', and get the surrounding lexical 'this'j
var person = {
  id: 123,
  getId: function() {
    setTimeout(function() {
      return this.id       // this is not pointing to person, but to the global object
    }, 100)
  }
}

var person = {
  id: 123,
  getId: function() {
    var self = this
    setTimeout(() => {
      self.id       // this is not pointing to person, but to the global object
    }, 100)
  }
}
