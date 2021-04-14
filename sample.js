const axios = require('axios');

const applyAsync = (acc, fn) => acc.then(fn);
const applySync = (acc, fn) => fn(acc);

const composeAsync = (...fns) => x => fns.reduce(applyAsync, Promise.resolve(x));
const composeAsyncReverse = (...fns) => x => fns.reduceRight(applySync, Promise.resolve(x));

const composeSync = (...fns) => x => fns.reduce(applySync, x);
const composeSyncReverse = (...fns) => x => fns.reduceRight(applySync, x);

const optimizedCompose = (...fs) => fs.reduceRight((g, f) => x => g(f(x)));

const TMap = tFn => rf => (acc, curr) => rf(acc, tFn(curr))

const TFilter = predicate => rf => (acc, current) => predicate(current) ? rf(acc, current) : acc;

const sum = (a, b) => a + b;
const concat = (a,b) => a.concat(b);

const nums  = [1,2,10];

const filterOdd = num => num % 2 === 0;

const doubleIt = (num) => num * 2;

// const pipeline = composeSyncReverse(TMap(doubleIt), TFilter(filterOdd))(sum);

// const pipeline = composeSyncReverse(TMap(doubleIt), TFilter(filterOdd))(concat);

const pipeline = optimizedCompose(TFilter(filterOdd), TMap(doubleIt))(concat)

let result = nums.reduce(pipeline, []);

console.log(result);


