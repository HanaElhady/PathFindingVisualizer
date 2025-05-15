import React, { useState, useEffect } from 'react';
import Node from './Node';
import { useWallContext } from '../../context/WallContext';
import { NodeType } from '../../types';

interface GridProps {
  startPosition: string | null;
  endPosition: string | null;
  draggedItem: { id: string; overId: string } | null;
  visitedNodes: string[];
  pathNodes: string[];
  isPlaying: boolean;
  onClearGrid: () => void;
}

const Grid: React.FC<GridProps> = ({
  startPosition,
  endPosition,
  visitedNodes,
  pathNodes,
  isPlaying,
  onClearGrid }) => {

  const { wallPositions, toggleWall } = useWallContext();
  const [columns, setColumns] = useState(20);
  const [visualState, setVisualState] = useState<Record<string, Partial<NodeType>>>({});
  const [isMousePressed, setIsMousePressed] = useState(false);

  const MAX_ROW = 15;

  

  useEffect(() => {
  let isCancelled = false;

  const animateAlgorithm = async (visited: string[], path: string[]) => {
    if (!isPlaying) {
      isCancelled = true;
      onClearGrid();
      return;
    }

    for (let i = 0; i < visited.length; i++) {
      if (isCancelled) {onClearGrid(); return;}
      await new Promise(res => setTimeout(res, 30));
      setVisualState(prev => ({
        ...prev,
        [visited[i]]: { ...(prev[visited[i]] || {}), isVisited: true },
      }));
    }

    for (let i = 0; i < path.length; i++) {
 if (isCancelled) {onClearGrid(); return;}
      await new Promise(res => setTimeout(res, 50));
      setVisualState(prev => ({
        ...prev,
        [path[i]]: { ...(prev[path[i]] || {}), isPath: true },
      }));
    }
  };

  if (visitedNodes.length === 0 && pathNodes.length === 0) {
    setVisualState({});
  }

  if (visitedNodes.length > 0 || pathNodes.length > 0) {
    animateAlgorithm(visitedNodes, pathNodes);
  }

  const calculateColumns = () => {
    const screenWidth = window.innerWidth;
    const cellSize = 50;
    const cols = Math.floor(screenWidth / (cellSize + 2));
    setColumns(cols);
  };

  calculateColumns();
  window.addEventListener('resize', calculateColumns);

  return () => {
    isCancelled = true; // 🔁 this cancels animation on cleanup
    window.removeEventListener('resize', calculateColumns);
  };
}, [visitedNodes, pathNodes, isPlaying]); // ← also track `isPlaying`


  const handleWallToggle = (id: string) => {
    if(isPlaying) return; // Prevent wall toggling during animation
    toggleWall(id);
  };

  const grid = [];
  for (let i = 0; i < MAX_ROW; i++) {
    for (let j = 0; j < columns; j++) {
      const id = `node-${i}-${j}`;
      const visual = visualState[id] || {};
      const node = {
        row: i,
        col: j,
        isStart: startPosition === id,
        isEnd: endPosition === id,
        isWall: wallPositions.includes(id),
        distance: 0,
        f: 0,
        g: 0,
        h: 0,
        previousNode: null,
        ...visual
      };

      grid.push(
        <Node
          key={id}
          node={node}
          onWallToggle={() => handleWallToggle(id)}
          onMouseEnter={() => {
            if (isMousePressed) handleWallToggle(id);
          }}
          //onClick={() => handleWallToggle(id)} 
        />
      );
    }
  }

  return (
    <div
      className="flex flex-col min-h-screen px-2 pt-8 select-none"
      onMouseDown={() => setIsMousePressed(true)}
      onMouseUp={() => setIsMousePressed(false)}
      onMouseLeave={() => setIsMousePressed(false)}
    >
      <div
        className="grid w-full max-w-screen-2xl"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          columnGap: '1px',
          rowGap: '6px',
        }}
      >
        {grid}
      </div>
    </div>
  );
};

export default Grid;
