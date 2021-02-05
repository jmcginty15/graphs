class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) this.nodes.add(vertex);
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let edge of vertex.adjacent) this.removeEdge(vertex, edge);
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set([start]);
    const values = [];
    const stack = [start];
    while (stack.length) {
      const current = stack.pop();
      values.push(current.value);
      for (let node of current.adjacent.values()) {
        if (!visited.has(node)) {
          stack.push(node);
          visited.add(node);
        }
      }
    }
    return values;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = new Set([start]);
    const values = [];
    const queue = [start];
    while (queue.length) {
      const current = queue.shift();
      values.push(current.value);
      for (let node of current.adjacent.values()) {
        if (!visited.has(node)) {
          queue.push(node);
          visited.add(node);
        }
      }
    }
    return values;
  }

  // this function returns the length of the shortest path length between two nodes, or null if there is no path
  shortestPath(n1, n2) {
    if (n1 == n2) return 0;
    let shortestPath = null;
    const stack = [{ node: n1, pathLength: 0, visited: new Set([n1]) }];
    while (stack.length) {
      const current = stack.pop();
      current.pathLength += 1;
      for (let node of current.node.adjacent.values()) {
        if (node == n2) {
          if (current.pathLength < shortestPath || !shortestPath) shortestPath = current.pathLength;
        } else if (!current.visited.has(node)) {
          const visited = new Set([...current.visited]);
          visited.add(node);
          stack.push({ node: node, pathLength: current.pathLength, visited: visited });
        }
      }
    }
    return shortestPath;
  }

  // this function returns true if the graph has a cycle accessible from the start node, false if it does not
  hasCycleFrom(start) {
    const stack = [{ node: start, visited: new Set([start]), lastVisited: null }];
    while (stack.length) {
      const current = stack.pop();
      for (let node of current.node.adjacent.values()) {
        if (current.lastVisited != node) {
          if (current.visited.has(node)) return true;
          else {
            const visited = new Set([...current.visited]);
            visited.add(node);
            stack.push({ node: node, visited: visited, lastVisited: current.node });
          }
        }
      }
    }
    return false;
  }

  // this function returns true if the graph has a cycle, false if it does not
  hasCycle() {
    for (let node of this.nodes.values()) if (this.hasCycleFrom(node)) return true;
    return false;
  }
}

module.exports = { Graph, Node }