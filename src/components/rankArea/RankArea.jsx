import React, {useState, useEffect} from 'react';
import {Droppable} from '../../Droppable';
import {Draggable} from '../../Draggable';
import style from './rankArea.module.css';

const RankArea = ({id, parent, child}) => {
  const showChild = parent === id && child;
  const [childrenList, setChildrenList] = useState([]);

  useEffect(() => {
    if (showChild && child && !childrenList.some(c => c.id === child.id)) {
      setChildrenList(prev => [...prev, child]);
    }
    if (child && child.position !== id && childrenList.some(el => el.id === el.id)) {
      setChildrenList(prev => prev.filter(el => el.id !== child.id));
    }

    console.log('childrenList:', childrenList);
  }, [showChild, child]);

  return (

    <>
      <Droppable id={id} key={id} className={style.rankDroppable}>
        {console.log('parent:', parent)}
        {childrenList.map((element) => (
          <Draggable key={element.id} id={element.id}>{element.content}</Draggable>
        ))}
        {!childrenList.length && <p>Drag items here</p>}
      </Droppable>
    </>

          // <Draggable id={child.id} key={child.id}>{child.content}</Draggable>

  );
};

export {RankArea};