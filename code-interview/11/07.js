'use strict';

let items = [
  [170, 80],
  [170, 90],
  [160, 81],
  [150, 60],
  [160, 80],
  [190, 95]
]


function stack(items) {
  let sortedWeight = items.sort((a,b) => {
    return a[0] > b[0]
  })

  // find longest icreasing substring;
  // TODO
  return sortedWeight;
}

console.log(stack(items))
