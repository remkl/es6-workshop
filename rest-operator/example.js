// ** Spread operator can be used to replace .concat()

// Imperative way
const x = [1, 2]
const y = [3, 4]
const z = [0].concat(x, y, 5) // [0,1,2,3,4,5]

// Declarative way
const z = [0, ...x, ...y, 5]

function coolFunction(x, y, ...rest) {
	console.log(rest) // 3 4 5
}
coolFunction(1, 2, 3, 4, 5)


// Object spread
const object1 = {
  foo: 42,
  bar: 'hey'
}

const object2 = {
  ...object1,
  newKey: 'lol'
}
