const axios = require('axios');

const apply = (acc, fn) => acc.then(fn);

const compose = (...fns) => x => fns.reduce(apply, Promise.resolve(x));

const  fetchUserName = async (username) => axios.get(`https://api.github.com/users/${username}`)

const fetchKeyAsync = key => async (obj) => obj[key];

const pipeline = compose(fetchUserName, fetchKeyAsync('data'), fetchKeyAsync('login'));

const result = pipeline('yravinderkumar33');

result
.then(res => {
    console.log(res);
}).catch(err => {
    console.log(`sinlge catch block`);
})
