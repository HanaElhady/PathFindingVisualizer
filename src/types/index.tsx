import { useState } from "react";

// src/types/index.ts
type AlgorithmType = 'Dijkstra' | 'Astar';
export const [algorithm, setAlgorithm] = useState<AlgorithmType>('Dijkstra');

export interface NodeType {
    row: number;
    col: number;
    isStart?: boolean;
    isEnd?: boolean;
    isWall?: boolean;
    distance?: number;         // Used in Dijkstra
    f?: number;                // f = g + h (Used in A*)
    g?: number;                // Cost from start (Used in A*)
    h?: number;                // Heuristic cost to end (Used in A*)
    previousNode?: NodeType | null; // For path reconstruction
    isVisited?: boolean;
    isPath?: boolean;
    isCurrent?: boolean;
  }
  
  