import { useDraggable } from '@dnd-kit/core';

import { ReactNode } from 'react';

interface DraggableProps {
  id: string;
  children: ReactNode;
}

export const Draggable = ({ id, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};
