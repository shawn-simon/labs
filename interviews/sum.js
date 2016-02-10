// Create a function that takes an array and a number, and finds two values that
// add up to that number.

'use strict';
function findIndiciesForSum(list, sum) {
  let firstIndexMap = {};
  let result = null;

  list.forEach((val, i) => {
    if (firstIndexMap[i] === undefined)
    {
      firstIndexMap[val] = i;
    }
    else
    {
      let foundIndex = firstIndexMap[sum - val];
      result = [i, foundIndex]
      return false;
    }
  })

  return result;
}

let list = [0,1,2,3,4,5,6,9,9];
let sum = 15;

let result = findIndiciesForSum(list, sum);
console.log(result);
//console.log('sum found for: ', list[result[0]], ' and ', list[result[1]])
