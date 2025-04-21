import React, { useState } from 'react';
import Grid from './components/Grid/Grid';
import ControlPanel from './components/Controls/ControlPanel';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { WallProvider, useWallContext } from './context/WallContext'; // Import useWallContext
import { dijkstra } from './algorithms/dijkstra';

function App() {
  const [draggedItem, setDraggedItem] = useState<{ id: string; overId: string } | null>(null);
  const [startPosition, setStartPosition] = useState<string | null>(null);
  const [endPosition, setEndPosition] = useState<string | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [pathNodes, setPathNodes] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const { wallPositions, clearWalls } = useWallContext();

  const handleTogglePlay = (state: boolean) => {
  setIsPlaying(state);

   if (state) {
    handleRunAlgorithm();
  } else {
    handleClearGrid();
  }
 };

  const handleClearGrid = () => {
    setVisitedNodes([]);
    setPathNodes([]);
    setStartPosition(null);
    setEndPosition(null);
    setDraggedItem(null);
    if (clearWalls) clearWalls();
  };


  // Access wallPositions from WallContext using the custom hook


  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    if (!over) return;

    const dropId = over.id as string;

    // Prevent placing start/end on a wall position
    if (wallPositions.includes(dropId)) {
      return; // Don't allow placing on a wall
    }

    // Update start or end position based on dragged item
    if (active.id === 'bot' && dropId !== startPosition) {
      setStartPosition(dropId);
    } else if (active.id === 'point' && dropId !== endPosition) {
      setEndPosition(dropId);
    }

    setDraggedItem({ id: active.id.toString(), overId: dropId.toString() }); // Update dragged item state
  };

  const handleRunAlgorithm = () => {
    // Dummy data for now (you'll replace this with real algorithm output)
    if (!startPosition || !endPosition) return;

    //const visited = ['node-2-3', 'node-2-4', 'node-2-5'];
   // const path = ['node-2-5', 'node-3-5', 'node-4-5'];
    const { visitedOrder, shortestPath } = dijkstra(
      startPosition,
      endPosition,
      wallPositions,
      15, // MAX_ROW
      20  // columns — adjust if dynamic
    );
    setVisitedNodes(visitedOrder);
    setPathNodes(shortestPath);
  };
  

  return (
    <div className="p-6 bg-black">
      <div className="container mx-auto">
          <DndContext onDragEnd={handleDragEnd}>
           <ControlPanel onPlay={handleRunAlgorithm}  onTogglePlay={handleTogglePlay}  />
            <Grid
              startPosition={startPosition}
              endPosition={endPosition}
              draggedItem={draggedItem} // Pass draggedItem to Grid
              visitedNodes={visitedNodes}
              pathNodes={pathNodes}
            />
          </DndContext>
      </div>
    </div>
  );
}

export default App;
