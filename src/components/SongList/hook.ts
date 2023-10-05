import { useState, useEffect } from "react";
import { SongType } from "../../types/song";

export const useSongList = () => {
  const [songs, setSongs] = useState([])
  const [filteredSongs, setFilteredSongs] = useState<SongType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')
  const [categoryList, setCategoryList] = useState<string[]>([])
  const [chosenCategory, setChosenCategory] = useState('')

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
    const categories = songs.map((song: SongType) => song.category.attributes.label)
    const uniqueCategories = [...new Set(categories)]
    setCategoryList(uniqueCategories)
  }, [songs])

  const findSongs = (search: string, songsToFilter: SongType[], category?: boolean,) => {
    const songsFilter = songsToFilter.filter((song: SongType) => {
      // check for matches in song name, artist name and category
      if (song['im:name'].label.toLowerCase().includes(search.toLowerCase())) {
        return song
      } else if (song['im:artist'].label.toLowerCase().includes(search.toLowerCase())) {
        return song
      } else if (category && song.category.attributes.label.toLowerCase().includes(search.toLowerCase())) {
        return song
      } else {
        return false
      }
    })
    return songsFilter
  }

  const handleFilterSongs = (search: string) => {
    const categorySongs = songs.filter((song: SongType) => song.category.attributes.label === chosenCategory)
    const songsFilter = findSongs(search, chosenCategory ? categorySongs : songs, true)
    setFilteredSongs(songsFilter)
  }

  const handleChosenCategory = (category: string) => {
    const list = findSongs(search, songs, true)
    if (category === chosenCategory) {
      setChosenCategory('')
      setFilteredSongs(list)
      return
    }

    setChosenCategory(category)
    
    const songsFilter = list.filter((song: SongType) => {
      if (song.category.attributes.label === category) {
        return song
      } else {
        return false
      }
    })
    setFilteredSongs(songsFilter)
  }

  const handleReset = () => {
    setChosenCategory('')
    handleFilterSongs(search)
  }

  return {
    songs,
    filteredSongs,
    loading,
    error,
    search,
    categoryList,
    chosenCategory,
    handleFilterSongs,
    handleChosenCategory,
    handleReset,
    setSearch
  };
};