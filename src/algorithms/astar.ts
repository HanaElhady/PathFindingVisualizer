// aStar.ts
type NodeId = string;

interface GridNode {
  id: NodeId;
  row: number;
  col: number;
  distance: number;
  isWall: boolean;
  previousNode: NodeId | null;
  f: number;
  g: number;
  h: number;
}

const calculateHValue = (a: GridNode, b: GridNode): number => {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col); // Manhattan
};

const getNeighbors = (
  node: GridNode,
  grid: Record<NodeId, GridNode>,
  maxRow: number,
  maxCol: number
): GridNode[] => {
  const neighbors: GridNode[] = [];
  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0],
  ];

  directions.forEach(([dx, dy]) => {
    const newRow = node.row + dx;
    const newCol = node.col + dy;
    const id = `node-${newRow}-${newCol}`;
    if (
      newRow >= 0 && newRow < maxRow &&
      newCol >= 0 && newCol < maxCol &&
      grid[id] && !grid[id].isWall
    ) {
      neighbors.push(grid[id]);
    }
  });

  return neighbors;
};

export function aStar(
  startId: NodeId,
  endId: NodeId,
  wallPositions: NodeId[],
  maxRow: number,
  maxCol: number
): { visitedOrder: NodeId[], shortestPath: NodeId[] } {
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
        f: Infinity,
        g: Infinity,
        h: Infinity
      };
    }
  }

  const startNode = grid[startId];
  const endNode = grid[endId];

  startNode.g = 0;
  startNode.h = calculateHValue(startNode, endNode);
  startNode.f = startNode.h;

  const openSet = new Map<NodeId, GridNode>();
  openSet.set(startId, startNode);

  while (openSet.size > 0) {
    const current = [...openSet.values()].reduce((a, b) => a.f < b.f ? a : b);
    openSet.delete(current.id);

    if (current.isWall) continue;
    visitedOrder.push(current.id);

    if (current.id === endId) break;

    const neighbors = getNeighbors(current, grid, maxRow, maxCol);
    for (const neighbor of neighbors) {
      const tentativeG = current.g + 1;
      if (tentativeG < neighbor.g) {
        neighbor.previousNode = current.id;
        neighbor.g = tentativeG;
        neighbor.h = calculateHValue(neighbor, endNode);
        neighbor.f = neighbor.g + neighbor.h;
        openSet.set(neighbor.id, neighbor);
      }
    }
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
