import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

interface DroppableProps {
  id: string;
  children: ReactNode;
}

export const Droppable = ({ id, children }: DroppableProps) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style = {
    backgroundColor: isOver ? '#def' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
