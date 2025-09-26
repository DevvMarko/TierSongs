import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import styles from './App.module.css';

function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} className={styles.droppable} style={style} key={props.id} {...props}>
      {props.children}
    </div>
  );
}

export {Droppable};