//  n steps, can hop 1 2 or 3.

/*
n = 0
n = 1 {1}
n = 2 {1, 1}, {2}
n = 3 {3} {1,1,1}, {2,1}, {1,2}
n = 4 {3, 1} {1, 3} {1,1,1,1}, {2,1,1}, {1, 1,2} {1, 2, 1} {2, 2}

n...

(n - 1)
(n - 2)
(n - 3)

*/

var ways = {}
function countWays(n) {
  if (n < 0) return 0;
  if (n === 0) return 1;
  if (!ways[n]) ways[n] = countWays(n - 1) + countWays(n - 2) + countWays(n - 3);
  return ways[n];
}

console.log(countWays(100))
