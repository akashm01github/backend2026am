import React, { useState } from 'react'
import '../components/MoodSong.scss'



const MoodSongs = () => {

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
        <div className='container'>
            <h1>Recomended Song</h1>
            <div>
                {
                    songs.map((song,idx)=>{
                        return <div className='song__container' key={idx}>
                            <div>{song.title}</div>
                            <div className='play_pause_button'>
                                <button>Paly</button>
                                <button>Pause</button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default MoodSongs