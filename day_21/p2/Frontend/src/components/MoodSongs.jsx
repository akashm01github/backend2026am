import React, { useState } from 'react'
import '../components/MoodSong.scss'

const MoodSongs = ({ songs }) => {
  return (
    <div className='container'>
      <div className='section-label'>
        <h1>Recommended Songs</h1>
      </div>
      <div className='songs-wrapper'>
        {songs.map((song, idx) => (
          <div className='song__container' key={idx}>
            <div className='song-meta'>
              <div className='song-icon'>🎵</div>
              <div className='song-info'>
                <div className='song-title'>{song.title}</div>
                <div className='song-sub'>Recommended for your mood</div>
              </div>
            </div>
            <div className='play_pause_button'>
              <audio src={song.audio} controls></audio>
              <div className='btn-group'>
                <button className='btn-play'>▶ Play</button>
                <button className='btn-pause'>⏸ Pause</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MoodSongs