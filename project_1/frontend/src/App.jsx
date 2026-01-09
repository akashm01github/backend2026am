import React from 'react'
import FacialExpressionDetector from './components/FacialExpressionDetector'
import MoodSongs from './components/MoodSongs'
import { useState } from 'react'

const App = () => {

   const [songs, setSongs] = useState([
        {
            title:"Neele Neele Ambar Par",
            artist:"Kishore Kumar",
            url:"test_url"
        },
        {
            title:"Neele Neele Ambar Par",
            artist:"Kishore Kumar",
            url:"test_url"
        },
        {
            title:"Neele Neele Ambar Par",
            artist:"Kishore Kumar",
            url:"test_url"
        },
        {
            title:"Neele Neele Ambar Par",
            artist:"Kishore Kumar",
            url:"test_url"
        },

    ])




  return (
    <div>
      <FacialExpressionDetector setSongs={setSongs}/>
      <MoodSongs songs={songs}/>
    </div>
  )
}

export default App