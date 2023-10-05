import React, { useEffect, useState } from 'react'
import Song from '../Song/Song'
import { SongType } from '../../types/song'

const SongList = () => {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('https://itunes.apple.com/gb/rss/topsongs/limit=50/json')
      .then(response => response.json())
      .then(data => {
        setSongs(data.feed.entry)
        setLoading(false)
      })
  }, [])

  console.log(songs)
  return (
    <div className='mx-auto max-w-[900px]'>
      {loading && <p>Loading...</p>}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 justify-items-center'>
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