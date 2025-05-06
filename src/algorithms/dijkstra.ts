// dijkstra.ts
type NodeId = string;

interface GridNode {
  id: NodeId;
  row: number;
  col: number;
  distance: number;
  isWall: boolean;
  previousNode: NodeId | null;
}

const getNeighbors = (node: GridNode, grid: Record<NodeId, GridNode>, maxRow: number, maxCol: number): GridNode[] => {
  const neighbors: GridNode[] = [];
  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0], // Right, Down, Left, Up
  ];

  directions.forEach(([dx, dy]) => {
    const newRow = node.row + dx;
    const newCol = node.col + dy;
    const id = `node-${newRow}-${newCol}`;
    if (newRow >= 0 && newRow < maxRow && newCol >= 0 && newCol < maxCol && grid[id] && !grid[id].isWall) {
      neighbors.push(grid[id]);
    }
  });

  return neighbors;
};

export function dijkstra(
  startId: NodeId,
  endId: NodeId,
  wallPositions: NodeId[],
  maxRow: number,
  maxCol: number
): { visitedOrder: NodeId[]; shortestPath: NodeId[] } {
  const grid: Record<NodeId, GridNode> = {};
  const visitedOrder: NodeId[] = [];

  for (let row = 0; row < maxRow; row++) {
    for (let col = 0; col < maxCol; col++) {
      const id = `node-${row}-${col}`;
      grid[id] = {
        id,
        row,
        col,
        distance: Infinity,
        isWall: wallPositions.includes(id),
        previousNode: null,
      };
    }
  }

  grid[startId].distance = 0;
  const unvisited = Object.values(grid);

  while (unvisited.length > 0) {
    unvisited.sort((a, b) => a.distance - b.distance);
    const current = unvisited.shift()!;
    
    if (current.isWall) continue;
    if (current.distance === Infinity) break;

    visitedOrder.push(current.id);

    if (current.id === endId) break;

    const neighbors = getNeighbors(current, grid, maxRow, maxCol);
    neighbors.forEach(neighbor => {
      const alt = current.distance + 1;
      if (alt < neighbor.distance) {
        neighbor.distance = alt;
        neighbor.previousNode = current.id;
      }
    });
  }

  const shortestPath: NodeId[] = [];
  let currentId: NodeId | null = endId;
  while (currentId && grid[currentId].previousNode !== null) {
    shortestPath.unshift(currentId);
    currentId = grid[currentId].previousNode;
  }
  if (currentId === startId) shortestPath.unshift(startId);

  return { visitedOrder, shortestPath };
}
