import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import './Draggable.css'
function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <div ref={setNodeRef} style={style} className='videoCard' {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}

export {Draggable};