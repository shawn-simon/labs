'use strict';
let items = ['at', '', '', '', 'ball', '', '', 'car', '', '', 'dad', '', ''];

function search(str, items) {
  function step(start, end) {
    if (end < start) return -1;
    let mid = Math.floor((start+end) / 2);
    if (items[mid] === '')
    {
      let i = 1;
      let direction = true;
      while (mid => start && mid <= end) {
        mid += (direction ? i : -i);
        if (items[mid] !== '') break;
        i++;
        direction = !direction;
      }
    }
    if (items[mid] === str) {
      return mid
    } else if (items[mid] > str) {
      return step(start, mid - 1)
    } else {
      return (mid + 1, end)
    }
  }
  return step(0, items.length)
}

console.log(search('ball', items))
