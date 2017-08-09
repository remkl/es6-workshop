# Introduction to ES6
ES2015 also known as ES6 is a major update to the Javascript language. This repo is a high level overview of some of its prominent features and syntax.

# Modules

For a long time Javascript did not have a module system, something that comes standard in other programming languages like Java and Python.

The lack of a default module system in javascript lead to a number of community-driven solutions:

- IIFE (Immediately Invoked Function Expressions) / Revealing Module pattern
(Using closures to achieve information hiding.)

- CommonJS (Made for server-side NodeJS environment)
```js
module.exports = function example() {}  
require('custom-module')
```

- AMD (Came after CommonJS but intended for the browser)
```js
define('person', function() {
  return { name: 'Cornwallace' }
})
require(['person'], function(person) {
  console.log(person.name)
})
```

- UMD (Universal Module Definition, an attempt to mash CommonJS and AMD module solutions together)


#### ES6 Modules

ES6 modules have two main types of import/export: named and default.

Named exports export single entities from a particular module.
```js
// export.js
export config = {
  key: '123'
}
export function1 () {}

export const function2 = () => {}
...

// import.js
import { config, function1 } from './file'
import { function2 as anotherName } from './file'
import * as obj from './file'

obj.function2()
```

Default exports are for exporting a single entity from a module.
You can alias a default export as any other name when importing it.
```js
  // export1.js
  export default () => {
    return 42
  }

  // export2.js
  export default class Example {
    ...
  }

  ...
  // import.js
  import DefaultExport from './export1'
  import Example from './export2'
```

When importing ES6 modules, you can mix default export and named exports together:
```js
import React, { Component } from 'react'
```
(React is the default export, where Component is a named export, both from the same module)
For more information check out MDN: [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)


# Arrow Functions
The main motivations for including arrow functions into the language were probably for more concise inline functions. And to reduce the overhead/frustrations when using ```this``` based programming in Javascript.

Note: Arrow functions by default inherit the surrounding ```this``` context.

```js

const person = {
  firstName: 'Doug',
  getName: () => {
    return this.name
  }
}
person.getName() // undefined
// because 'this' inherits from the surrounding context, which isn't the person object
// but the global window scope (javascript is function scoped), where firstName isn't a property of the global scope, so we get undefined.

const person = {
  name: 'Fred',
  sayName: function() {
    setTimeout(() => {
      console.log(this.name)
    }, 1000)
  }
}

person.sayName() // 'Fred' after 1 second
```

Its useful to understand ```this``` and its dynamic nature in Javascript to avoid these cases when using arrow functions.

## A note on 'this' in Javascript
The value of ```this``` is dynamic, always depends on how the function/method is called.

Every function (with the exception of Arrow Functions), while executing, has a reference to its current execution context - which is what the ```this``` keyword points to.

In Javascript the only thing that matters in determining what ```this``` is, is by looking at how the function is called.

Four rules to help understand ```this```:

1. If a function is called in the global scope, the context is the global object.
2. If a function is called is on a object a preceding dot, the object before that dot is the context.
3. When a constructor function style is used, ```this``` refers to the new object that the ```new``` keyword returns.
4. ```this``` can be explicitly bound using .call(), .apply() and .bind()

# Template Strings
In ES6 we get a nice syntax for constructing dynamic strings using the ``` ` ``` back-ticks and ``` ${} ``` as a placeholder for variables:
```js
// ES5
var firstName = 'Alfred',
    lastName  = 'Jenkins'

var greeting = 'Hello ' + firstName + ' ' + lastName + '!'

// ES6
const greeting = `Hello ${firstName} ${lastName}!`
// can also use expressions inside ${}

const maths = `${1 + 2} is equal to 3` // 3 is equal to 3
```
You can also create custom tagged template literals using functions (similar to how the react style-components library works), which is beyond the scope of this introduction. For more information see: <https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals>

# Object Shorthands
We also get some terser syntax for dealing with objects. One of these is the object property short-hand notation:
```js
var firstName = 'Alfred',
    lastName  = 'Jenkins'

// ES5
var butler = {
  firstName: firstName,
  lastName: lastName
}
// here we just assign keys on the butler object to variables of the same name.

// ES6
const butler = {
  firstName,
  lastName
}    
// if the keys of the object match the same name as the variable, we can just reference the name once and still get the same results
```
Also short-hand object method notation, which looks like a regular function declaration without the function keyword:

```js
// ES5
var butler = {
  firstName: firstName,
  serveFood: function() {
    console.log('Your food is served')
  }
}

// ES6
const butler = {
  firstName,
  serveFood() {
    console.log('Your food is serverd')
  },
  deployToProd() {

  }
}
```
Objects in ES6 also get a new computed-property feature. This means you can reference an expression as a key to an object, which evaluates to a given key on the object:

```js
const foo = 'foo'

const computed = {
  [1+2+3]: 'six',
  [foo + 'bar']: 'Hello world'
}

computed['6'] // six
computed['foobar'] // Hell world

```


# Rest / Spread Operator
Used to gather, spread multiple elements in an array or object (Object spread is at stage 3).

- Spreading:
When ```...``` is used in front of an array it actively spreads the arrays elements one by one.
  ```js
  const arr1 = [1,2,3,4]
  const arr2 = [...ar1] // [1,2,3,4]
  ```
  It can also be used to gather up elements together to collect the 'rest' into an array, a common use case is in function params.
  ```js
    function foo (x, y,...rest) {
      // x = 1, y = 2
      // rest = [3, 4, 5]
    }
    foo(1,2,3,4,5)  
  ```
- Object Spread
Similar to array spreading object spread works by taking the keys and values of an object and placing them one by one to the destination object (Note is is not officially in the EcmaScript specification yet, but is at stage2 and requires transpilation):
```js
  const user = {
    userId: 321,
    name: 'Bob'
  }

  const policy = {
    userId: 123,
    policyNumber: 324234
  }

  const userPolicy = {
    ...policy,
    ...user
  }
```
Above we are creating an object literal, and 'spreading' out the keys and values from user and policy into the the new ```userPolicy``` object. Note that for duplicate keys, the last spread takes precedence, so ```userPolicy.userId // 321 ``` .

# Default Function Parameters
Unused parameters in Javascript functions default to undefined. A useful pattern is to set a default value in the case that no value was passed into the function.

```js
foo(1)
function foo(a, b) {
  b // undefined
}
```

A common pattern in ES5 code is to do some manual checking to check whether the param is exists or not

```js
times(1)
// ES5
function times(a, b) {
  b = (typeof b !== 'undefined') ? b : 1
  return a * b
}

// ES6
function times(a, b = 1) {
  return a * b
}
```

This is just a simple example. The value of the default parameter gets evaluated at call time, so you can assign it to an existing variable or to the result of a function call that returns a value for example.


# Array / Object Destructuring

The idea behind destructuring, is to take a structure - namely an array or an object, and to de-construct it down to its constitute parts, and extract those parts out into variables.

```js
// ES5
function foo () {
  return [1, 2, 3]
}

var arr = foo()
var first = arr[0]
var second = arr[1]
var third = arr[2]
```
In ES5, we have to create a temporary value, and manually extract the elements we want out from the array.

```js
// ES6
  // still using the foo Function

  const [ first, second, third ] = foo()
```
The two pieces of code are equivalent, ES6 just gives us this nicer, declarative syntax to extract the first three elements of the array returned by ```foo``` and assign them to the variable names: ```first```, ```second``` and ```third```

Similarly we can do the same with objects.

```js
const bar = {
  a: 1,
  b: 2,
  c: 3
}

const { a, b, c } = bar()
a // 1
b // 2
c // 3
```

A common pattern seen in React is to destructure the arguments of a function. By default components in React are passed an object called ```props```, using destructuring we can extract each of the values in the props object:

```js
const ReactComponent = ({ children, onChange }) => { // extract props.children and props.onChange
  return (
    <div>
      {children}
    </div>
  )
}

```
If you try to assign more values than are present in the structure you are destructuring from, you will just get ```undefined``` when you try to reference that variable.

You can also use default parameters with destructuring, so if something does come back undefined, you can make it so it always has a reasonable default value.

```js
const [first, second, third = 3] = baz()
function baz() {
  return [1,2]
}
```
