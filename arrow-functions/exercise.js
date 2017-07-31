// ** Arrow functions and 'this'
// 1. Fix this piece of code with arrow functions so calling slowTalker.sayGreeting() logs 'heylol'
const slowTalker = {
	greeting: 'heylol',
	sayGreeting: function() {
		setTimeout(function() {
			console.log(this.thingToSay)
		}, 1500)
	}
}




// ** Terser syntax
// use map/filter/reduce with arrow functions to solve the following:

// 2. Create an array of the names users over the age of 25
const users = [
	{ name: 'John', age: 30 },
	{ name: 'Snow', age: 25 },
	{ name: 'Corn Wallace', age: 17 },
	{ name: 'Santa Claus', age: 20 },
	{ name: 'Kool G Rap', age: 23 }
]



// 3. Return a number that caculates the total time of all tasks
var tasks = [
	{ name: 'Learn Javascript ES6', duration: 120 },
	{ name: 'Eat', duration: 60 },
	{ name: 'Drink', duration: 240 }
]
