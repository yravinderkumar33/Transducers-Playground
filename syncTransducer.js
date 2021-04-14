const apply = (acc, fn) => fn(acc);

const compose = (...fns) => x => fns.reduce(apply, x);


const add = a => b => a + b;

const multiple = a => b => a * b;

const pipeline = compose(add(2), multiple(2))

const result = pipeline(5)

console.log(result);


