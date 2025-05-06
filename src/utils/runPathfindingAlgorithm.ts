import { aStar } from "../lib/algorithms/pathfinding/aStar";
import { dijkstra } from "../lib/algorithms/pathfinding/dijkstra";
import { AlgorithmType, GridType, TileType } from "./types";

export const runPathfindingAlgorithm = ({
  algorithm,
  grid,
  startTile,
  endTile,
}: {
  algorithm: AlgorithmType;
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
}) => {

  switch (algorithm) {
    case "A_STAR":
      return aStar(grid, startTile, endTile);
    default:
      return dijkstra(grid, startTile, endTile);
  }
};
