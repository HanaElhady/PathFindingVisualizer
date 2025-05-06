// context/wallContext.tsx
import React, { createContext, useState, useContext } from 'react';

// Create Wall Context
const WallContext = createContext<any>(null);


// Custom hook to use the wall context
export const useWallContext = () => {
  const context = useContext(WallContext);
  if (!context) {
    throw new Error('useWallContext must be used within a WallProvider');
  }
  return context;
};

export const WallProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [wallPositions, setWallPositions] = useState<string[]>([]);

  const toggleWall = (id: string) => {
    setWallPositions((prev: string[]) => {
      if (prev.includes(id)) {
        return prev.filter((position) => position !== id); // Remove wall
      } else {
        return [...prev, id]; // Add wall
      }
    });
  };
  const clearWalls = () => { setWallPositions([]); };

  return (
    <WallContext.Provider value={{ wallPositions, toggleWall, clearWalls  }}>
      {children}
    </WallContext.Provider>
  );
};
