//** Rest / Spread operator

// In this exercise we want modify the foo and bar functions to utilise the rest / spread operator to make the console.log at the bottom print true

// Hint: we may need to spread in arguments to foo inside bar, and gather/rest the arguments in foo's parameters

function baz () {
}

function bar () {
	var array1 = [ 2, 4 ]
	var array2 = [ 6, 8, 10, 12 ]

	return baz()
}

console.log(
	bar().join("") === "281012" // join takes the elements in an array as joins them together as a string
);
