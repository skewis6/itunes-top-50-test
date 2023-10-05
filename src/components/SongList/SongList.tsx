import Song from '../Song/Song'
import { SongType } from '../../types/song'
import { useSongList } from './hook'

const SongList = () => {
  const { 
    categoryList, 
    filteredSongs, 
    loading, 
    error, 
    search, 
    chosenCategory, 
    handleFilterSongs, 
    handleChosenCategory, 
    handleReset,
    setSearch
  } = useSongList()

  if (loading) return <p>Loading...</p>

  return (
    <div className='mx-auto max-w-[900px]'>
     
      {error && <p>There was an error</p>}
      <div className='flex justify-center'>
        <label htmlFor='filter' className='sr-only'>Filter by artist, song title or category</label>
        <input
          type='text'
          id='filter'
          placeholder='Filter by artist, song title or category'
          className='border border-gray-300 mb-10 rounded-md px-3 py-2 w-full sm:w-1/2 md:w-1/3'
          onChange={e => {
            setSearch(e.target.value)
            handleFilterSongs(e.target.value)
          }}
        />
      </div>
      <div className='flex justify-center flex-wrap gap-5 mb-10'>
        {categoryList.map(category => {
          return (
            <button
              key={category}
              onClick={() => {
                handleChosenCategory(category)
              }}
              className={`px-3 py-2 rounded-2xl border-solid border border-black font-bold text-xs transition hover:bg-slate-100 active:bg-slate-200 ${category === chosenCategory ? ' bg-black text-white hover:bg-black' : ''}`}
            >
              {category}
            </button>
          )
        })}
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 justify-items-center'>
        {filteredSongs.map((song: SongType) => {
          return (
            <Song key={song.id.attributes['im:id']} song={song} />
          )
        })}
        
      </div>
      {filteredSongs.length === 0 && search &&
        <>
          <p className='text-6xl text-center'>&#128556;</p>
          <p className='font-bold text-2xl text-center'>No songs found!</p>
          <p className='font-bold text-xl text-center mt-10'>Try searching by song name, artist or category...</p>
        </>
      }
    </div>
  )
}

export default SongList