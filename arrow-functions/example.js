// Arrow functions provide a short, terser sytnax used to replace the 'function' keyword
// Arrow functions are anonymous functions

// Simple example
var hello = function hey () {}
const hey = () => {}

// Returning values
const hey = () => '42'



// Returning objects


// Single params


// ** Useful scenarios
// callbacks






var variable = 'lol'

function foo() {
	return this.variable
}

const object = {
	variable: variable,
	foo: foo
}




function Person(name) {
	this.name = name
	this.variable = 'Not lol'
}

const dickon = new Person('dickon')



console.log(foo.call(object))


this.method = this.method.bind(this)




// Maintaining the value of 'this' - Arrow functions get their 'this', from the surrounding lexical 'this'
var person = {
	id: 123,
	getId: function() {
		setTimeout(function() {
			return this.id // this is not pointing to person, but to the global object
		}, 100)
	}
}


var person = {
	id: 123,
	getId: function() {
		var self = this
		setTimeout(function() {
			return self.id
		}, 100)
	}
}

var person = {
	id: 123,
	getId: function() {
		setTimeout(() => {
			return this.id
		}, 100)
	}
}


// this in javascript
