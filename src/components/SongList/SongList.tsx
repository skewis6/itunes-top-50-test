import React, { useEffect, useState } from 'react'
import Song from '../Song/Song'
import { SongType } from '../../types/song'

const SongList = () => {
  const [songs, setSongs] = useState([])
  const [filteredSongs, setFilteredSongs] = useState([] as SongType[])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    fetch('https://itunes.apple.com/gb/rss/topsongs/limit=50/json')
      .then(response => response.json())
      .then(data => {
        setSongs(data.feed.entry)
        setLoading(false)
      })
      .catch(error => {
        setError(true)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    setFilteredSongs(songs)
  }, [songs])

  const filterSongs = (search: string) => {
    const filteredSongs = songs.filter((song: SongType) => {
      return song['im:name'].label.toLowerCase().includes(search.toLowerCase())
    })
    setFilteredSongs(filteredSongs)
  }

  console.log(songs)
  return (
    <div className='mx-auto max-w-[900px]'>
      {loading && <p>Loading...</p>}
      {error && <p>There was an error</p>}
      <div className='flex justify-center'>
        <input
          type='text'
          placeholder='Search...'
          className='border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/2'
          onChange={e => filterSongs(e.target.value)}
        />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 justify-items-center'>
        {filteredSongs.map((song: SongType) => {
          return (
            <Song key={song.id.attributes['im:id']} song={song} />
          )
        })}
      </div>
    </div>
  )
}

export default SongList