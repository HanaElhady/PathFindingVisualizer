// src/store/gridStore.ts
import { create } from 'zustand';

type GridState = {
  grid: any[][];
  setGrid: (newGrid: any[][]) => void;
};

export const useGridStore = create<GridState>((set) => ({
  grid: [],
  setGrid: (newGrid) => set({ grid: newGrid }),
}));
