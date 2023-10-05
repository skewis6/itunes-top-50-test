import React, { useEffect, useState } from 'react'
import Song from '../Song/Song'
import { SongType } from '../../types/song'

const SongList = () => {
  const [songs, setSongs] = useState([])
  useEffect(() => {
    fetch('https://itunes.apple.com/gb/rss/topsongs/limit=50/json')
      .then(response => response.json())
      .then(data => {
        setSongs(data.feed.entry)
      })
  }, [])

  console.log(songs)
  return (
    <div className='mx-auto max-w-[900px]'>
      <div className='grid grid-cols-5 gap-5'>
        {songs.map((song: SongType) => {
          return (
            <Song key={song.id.attributes['im:id']} song={song} />
          )
        })}
      </div>
    </div>
  )
}

export default SongList