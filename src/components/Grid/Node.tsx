import React from 'react';
import { NodeType } from '../../types';
import { Droppable } from '../../utils/droppable';

interface NodeProps {
  node: NodeType;
  onWallToggle: (id: string) => void;
  onMouseEnter?: () => void;
}

const Node: React.FC<NodeProps> = ({ node, onWallToggle, onMouseEnter }) => {
  const { isStart, isEnd, isWall } = node;
  const id = `node-${node.row}-${node.col}`;

  const handleNodeClick = () => {
    if (!isStart && !isEnd) {
      onWallToggle(id); 
    }
  };
  return (
    <Droppable id={id}>
      <div
        onClick={handleNodeClick}
        onMouseEnter={onMouseEnter}
        className={`w-10 aspect-square h-10 border rounded-2xl flex items-center justify-center transition-colors duration-300
          ${!isWall ? 'border-gray-300 bg-[#C7EDE6]' : 'border-none bg-transparent'}
          ${node.isPath ? 'bg-purple-200' : node.isVisited ? 'bg-blue-300' : ''}
          ${node.isCurrent ? 'bg-blue-400 animate-ping' : ''}`}
        style={{ cursor: 'pointer' }}
      >
        {isStart && (
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/color/50/bot.png"
            alt="bot"
          />
        )}
        {isEnd && (
          <img
            width="64"
            height="64"
            src="https://img.icons8.com/nolan/64/point-objects.png"
            alt="point-objects"
          />
        )}
        {isWall && (
          <img
            width="64"
            height="64"
            src="https://img.icons8.com/dusk/64/block.png"
            alt="block"
          />
        )}
      </div>
    </Droppable>
    
  );
};

export default Node;
