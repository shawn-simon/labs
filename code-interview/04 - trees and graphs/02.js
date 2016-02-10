'use strict';

let graphlib = require('graphlib');

let graph = new graphlib.Graph();

graph.setNode(1, {})
graph.setNode(2, {})
graph.setNode(3, {})
graph.setNode(4, {})
graph.setNode(5, {})
graph.setNode(6, {})
graph.setNode(7, {})

graph.setEdge(1, 2)
graph.setEdge(1, 3)
graph.setEdge(2, 4)
graph.setEdge(4, 1)
graph.setEdge(3, 5)
graph.setEdge(5, 6)
graph.setEdge(6, 7)

//let result = graphlib.alg.dijkstra(graph, 1);
//console.log(result)

function hasPathBFS(graph, source, dest) {
  let queue = [source], current;
  while (current = queue.pop()) {
    if (current == dest) return true;
    let val = graph.node(current);
    if (!val.visited) {
      graph.neighbors(current).forEach((id) => {
        queue.unshift(id)
      })
    }
    val.visited = true;
    graph.setNode(current, val)
  }
  return false;
}

console.log(hasPathBFS(graph, 1, 7)) // true
console.log(hasPathBFS(graph, 1, 8)) // false
