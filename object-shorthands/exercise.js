// refactor the following object to make use of the new ES6 object-shorthand syntax

var firstName = 'Alfred'
var lastName = 'Jenkins'

var getFood = function() {
  console.log('Your food is ready mr' + this.lastName)
}

var person = {
  firstName: firstName,
  lastName: lastName,
  sayName: function() {
    console.log(this.name)
  },
  getFood: getFood
}
