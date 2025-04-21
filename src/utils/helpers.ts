// src/utils/helpers.ts
export function createEmptyGrid(rows: number, cols: number) {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        currentRow.push({ row, col });
      }
      grid.push(currentRow);
    }
    return grid;
  }
  