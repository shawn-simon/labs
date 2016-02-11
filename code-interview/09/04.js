// return all subsets of a set.

'use strict';
let list = [1, 2, 3]

console.log(getAllSubsets(list))

function getAllSubsets(list) {
  let results = [];
  for (let i = 0; i < Math.pow(2, list.length); i++)
  {
    let combo = [];
    let index = 0;
    for (let k = i; k > 0; k >>= 1)
    {
      if (k & 1) {
        combo.push(list[index])
      }
      index++;
    }
    results.push(combo)
  }
  return results
}
