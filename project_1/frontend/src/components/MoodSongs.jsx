import React, { useState } from 'react'

import './moodSongs.css'

const MoodSongs = () => {
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

    const renderData = songs.map((song,idx)=>{
        return <div key={idx} className='songItem'>
            <div className="title">
                <h3 className='song_title'>{song.title}</h3>
                <p>~ {song.artist}</p>
            </div>
            <div className="play_pause_btn">
                <i className="ri-play-circle-fill play_btn"></i>
                <i className="ri-pause-large-fill pause_btn"></i>
            </div>
        </div>
    })



  return (
    <div className='mood_container'>
    <h1 className='heading_2'>Recomended Songs</h1>
    {renderData}
    </div>
  )
}

export default MoodSongs