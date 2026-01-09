import React, { useState } from 'react'

import './moodSongs.css'

const MoodSongs = ({songs}) => {
   

    const renderData = songs.map((song,idx)=>{
        return <div key={idx} className='songItem'>
            <div className="title">
                <h3 className='song_title'>{song.title}</h3>
                <p>~ {song.artist}</p>
            </div>
            <div className="play_pause_btn">
                <audio src={song.audioUrl} controls></audio>
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