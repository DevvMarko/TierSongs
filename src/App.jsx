import { useState } from 'react'
import { DndContext } from '@dnd-kit/core'
import {UnrankedArea} from './components/unrankedArea/UnrankedArea'
import {RankArea} from './components/rankArea/RankArea'

import style from './App.module.css'

const rankArray = [
  { id: 'rankbox1', title: '10/10'},
  { id: 'rankbox2', title: '9.5/10'},
  { id: 'rankbox3', title: '9/10'},
  { id: 'rankbox4', title: '8.5/10'},
  { id: 'rankbox5', title: '8/10'},
  { id: 'rankbox6', title: '7.5/10'},
  { id: 'rankbox7', title: '7/10'},
  { id: 'rankbox8', title: '6.5/10'},
  { id: 'rankbox9', title: '6/10'},
  { id: 'rankbox10', title: '5.5/10'},
  { id: 'rankbox11', title: '5/10'}
]




function App() {
  const [items, setItems] = useState([
    
  ]);
  const [parent, setParent] = useState(null);
  const [childId, setChildId] = useState(null);

  const addItem = (title) => {
    setItems((prevItems) => [
      ...prevItems,
      {id: `${prevItems.length + 1}`, content: `${title}`, position: 'unranked_area'},
    ]);

    console.log('Add item clicked');
    console.log(items);
  }

  const handleVideoURL = async () => {
    const promptURL = prompt('Enter YouTube video URL:');
    try{
      const response = await fetch(`https://www.youtube.com/oembed?url=${promptURL}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetch successful:', data);
      console.log('Video Title:', data.title);
      addItem(data.title);
    }catch (error) {
      console.error(error.message);
    } 
  }


  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={style.container}>
        <h1>TierSongs</h1>
        <p>Listen, add and rate songs from YouTube!</p>

        <table className={style.rankTable}>
          <tbody>
            {rankArray.map(rank => (
              <tr key={rank.id} id={rank.id}>
                <td>{rank.title}</td>
                <td >
                  <div className={style.slotsContainer}>
                    <RankArea className={style.slotsContainer} id={rank.id} parent={parent} child={items.find(item => item.id === childId)}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>  
        
        <table className={style.unrankedTable}>
          <tbody>
            <tr>
              <td>
                <button onClick={handleVideoURL}>
                  Add
                </button>
              </td>
              <td>
                  <div className={style.slotsContainer}>
                    <UnrankedArea items={items} id='unranked_area'/>
                  </div>
                  

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DndContext>
  )

  function handleDragEnd(event) {
    const {active, over} = event;
    console.log('Drag ended:', {active, over});
    setParent(over?.id ?? null);
    setChildId(active?.id ?? null);
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === active.id ? {...item, position: over?.id || item.position} : item
      )
    );
  }
}

export default App;