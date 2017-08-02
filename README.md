# Introduction to ES6
ES2015+ is a major update to the Javascript language. This repo is a high level overview of some of its prominent features and syntax.


# Modules

For a long time Javascript did not have a module system, something that is standard in other programming languages like Java and Python.

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

- UMD (Attempt to mash CommonJS and AMD module solutions together, didn't really catch on compared to others)


#### ES6 Modules

There are two main types of exports: named and default.

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
  // export.js
  export default () => {
    return 42
  }

  export default class Example {
    ...
  }

  ...
  // import.js
  import DefaultExport from './file'
  import Example from './file'
```

When importing ES6 modules, you can mix default export and named exports together:
```js
import React, { Component } from 'react'
```
(React is the default export, where Component is a named export, both from the same module)


# Arrow Functions
The main motivations for including arrow functions into the language were probably for more concise inline functions. And to reduce the overhead/frustrations when using ```this``` in Javascript.

Arrow functions by default inherit the surrounding ```this``` context.

```js

const person = {
  firstName: 'Doug',
  getName: () => {
    return this.name
  }
}
person.getName() // undefined
// because 'this' inherits from the surrounding context, which isn't the person object
// (Javascript is function scoped) but the global window scope, where firstName isn't a property of the global scope, thus undefined.

const weather = {
  currentTemp: 42,
  updateWeather: () => {
    setInterval(() => {
      this.currentTemp = Math.random()
    }, 3000)
  }
}
weather.updateWeather() // weather.currentTemp will always return 42
// again because arrow functions inherit 'this from the surrounding scope,
// even when they are nested', so the call back function tries to set window.currentTemp, which doesn't exist.

const weather = {
  currentTemp: 42,
  updateWeather: function() {
    setInterval(() => {
      this.currentTemp = Math.random()
    }, 3000)
  }
}

weather.updateWeather() // returns different value when accessing weather.currentTemp every 3 seconds
// this works because arrow functions
```


Another gotcha example
```js
  const person = {``
    firstName: 'John',
    getName: () => {
      return this.firstName
    }
  }
  person.get() // undefined
```
Its important to understand how ```this``` works in Javascript and its dynamic nature to avoid these cases when using arrow functions.

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
Similar to array spreading object spread works by taking the keys and values of an object and placing them one by one to the destination object:
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
