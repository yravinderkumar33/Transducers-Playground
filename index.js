const { TFilter, TMap, applyAsync, composeAsync, composeAsyncReverse, optimizedCompose, applySync, composeSync, composeSyncReverse } = require('./utils');
const axios = require('axios');

//reducing fn
const concat = (xs, val) => xs.concat(val);
const sum = (a, b) => a + b;

// transformation fns
const doubleIt = num => num * 2;
const add1 = num => num + 1;

//predicates
const filterNum = numToFilter => num => num !== numToFilter
const isEven = num => num % 2 === 0;
const isOdd = num => !isEven(num)

const nums = [1,2];

const pipeline = optimizedCompose(TMap(doubleIt), TFilter(isOdd))

let result = nums.reduce(pipeline(concat), []);

console.log(result);


