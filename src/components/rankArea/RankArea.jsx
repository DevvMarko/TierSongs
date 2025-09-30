import React from 'react';
import { Droppable } from '../../Droppable';
import { Draggable } from '../../Draggable';
import style from './rankArea.module.css';

// Changed props from {id, parent, child} to {id, items}
const RankArea = ({ id, items }) => {
  return (
    <>
      <Droppable id={id} key={id} className={style.rankDroppable}>
        {/* Map directly over the received items prop */}
        {items.map((element) => (
          <Draggable key={element.id} id={element.id}>
            {element.content}
          </Draggable>
        ))}

        {/* A simpler check to show the placeholder text */}
        {items.length === 0 && <p>Drag items here</p>}
      </Droppable>
    </>
  );
};

export { RankArea };