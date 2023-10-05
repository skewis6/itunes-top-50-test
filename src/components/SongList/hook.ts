import { useState, useEffect } from "react";
import { SongType } from "../../types/song";

export const useSongList = () => {
  const [songs, setSongs] = useState([])
  const [filteredSongs, setFilteredSongs] = useState([] as SongType[])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://itunes.apple.com/gb/rss/topsongs/limit=50/json')
      .then(response => response.json())
      .then(data => {
        setSongs(data.feed.entry)
        setLoading(false)
      })
      .catch(e => {
        setError(e)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    setFilteredSongs(songs)
  }, [songs])

  const filterSongs = (search: string) => {
    setSearch(search)
    const filteredSongs = songs.filter((song: SongType) => {
      // check for matches in song name, artist name and category
      if (song['im:name'].label.toLowerCase().includes(search.toLowerCase())) {
        return song
      } else if (song['im:artist'].label.toLowerCase().includes(search.toLowerCase())) {
        return song
      } else if (song.category.attributes.label.toLowerCase().includes(search.toLowerCase())) {
        return song
      } else {
        return false
      }
    })
    setFilteredSongs(filteredSongs)
  }

  return {
    songs,
    filteredSongs,
    loading,
    error,
    search,
    filterSongs,
  };
};