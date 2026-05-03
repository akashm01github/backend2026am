import React, { useState } from 'react'
import FacialExpression from './components/FacialExpression'
import MoodSong from './components/MoodSong'
import './App.scss'

const App = () => {
  const [songs, setSongs] = useState([])

  return (
    <div className="app-layout">
      <section className="app-section app-section--camera">
        <FacialExpression setSongs={setSongs} />
      </section>

      <section className="app-section app-section--songs">
        <MoodSong songs={songs} />
      </section>
    </div>
  )
}

export default App