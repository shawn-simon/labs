// how many ways can a robot get from 0,0 to X,Y
'use strict';
let map = {
  /*'1,1': 'invalid'*/
};
function traverseTo(x, y)
{
  if (x == 0 & y == 0) return 1;
  if (x < 0 || y < 0) return 0;
  let key = x+','+y;
  if (map[key] == 'invalid') return 0;
  if (!map[key]) map[key] = traverseTo(x - 1, y) + traverseTo(x, y - 1);
  return map[key];
}

console.log(traverseTo(3,3));
