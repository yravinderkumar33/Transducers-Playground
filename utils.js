const applyAsync = (acc, fn) => acc.then(fn);
const applySync = (acc, fn) => fn(acc);

const composeAsync = (...fns) => x => fns.reduce(applyAsync, Promise.resolve(x));
const composeAsyncReverse = (...fns) => x => fns.reduceRight(applySync, Promise.resolve(x));

const composeSync = (...fns) => x => fns.reduce(applySync, x);
const composeSyncReverse = (...fns) => x => fns.reduceRight(applySync, x);

const optimizedCompose = (...fs) => fs.reduceRight((g, f) => x => g(f(x)));

// const TMap = tFn => rf => (acc, x) => rf(acc, tFn(x));

function TMap(f) {
    return function(rf) {
      // this takes 2 things and makes them 1
      return (acc, val) => {
        return rf(acc, f(val)); // <-- rf replaces 'concat'
      };
    };
  }

const TFilter = predicate => rf => (acc, x) => predicate(x) ? rf(acc, x) : acc;

module.exports = {
    applyAsync,
    applySync,
    composeAsync,
    composeSync,
    composeAsyncReverse,
    composeSyncReverse,
    optimizedCompose,
    TFilter,
    TMap
}