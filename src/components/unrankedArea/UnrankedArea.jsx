import React from 'react';
import {Droppable} from '../../Droppable';
import {Draggable} from '../../Draggable';
import style from './Unranked.module.css';

const UnrankedArea = ({items, id}) => {
  return (
    <>
      <Droppable id={id} className={style.unrankedDroppable}>
        {items.map((item) => (
          item.position === id &&
          <Draggable key={item.id} id={item.id}>{item.content}</Draggable>
        ))}
      </Droppable>
    </>
  );
};
export {UnrankedArea};