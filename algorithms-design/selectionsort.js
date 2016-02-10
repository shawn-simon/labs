// todo: HEAPSORT
'use strict'

function selectionSort(list) {
  for (let i = 0; i < list.length; i++)
  {
    let swapIndex = i;
    console.log('looking for lowest int for position', i)
    for (let j = i; j < list.length; j++)
    {
      console.log('looking for lower int at position:', j)
      if (list[swapIndex] > list[j]) swapIndex = j;
    }
    let buffer = list[i];
    list[i] = list[swapIndex];
    list[swapIndex] = buffer;
  }
  return list
}


console.log(selectionSort([3,9,1,2,7,9,0,-5]))
