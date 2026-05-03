import React, { useState } from 'react'
import FacialExpression from './components/FacialExpression'
import FaceExp from './components/FaceExp'
import MoodSongs from './components/MoodSongs'

const App = () => {

   const [songs, setSongs] = useState([
        {
            title: "Song_title_1",
            artist: "Artist",
            url: 'test_url'
        },
        {
            title: "Song_title_2",
            artist: "Artist",
            url: 'test_url'
        },
        {
            title: "Song_title_3",
            artist: "Artist",
            url: 'test_url'
        },
        {
            title: "Song_title_4",
            artist: "Artist",
            url: 'test_url'
        }
    ]);


  return (
    <div>
      <FacialExpression setSongs={setSongs}/>
      <MoodSongs songs={songs}/>
    </div>
  )
}

export default App