import Song from '../Song/Song'
import { SongType } from '../../types/song'
import { useSongList } from './hook'

const SongList = () => {
  const { songs, filteredSongs, loading, error, search, filterSongs } = useSongList()

  console.log(songs)

  if (loading) return <p>Loading...</p>

  return (
    <div className='mx-auto max-w-[900px]'>
     
      {error && <p>There was an error</p>}
      <div className='flex justify-center'>
        <input
          type='text'
          placeholder='Filter tracks...'
          className='border border-gray-300 mb-10 rounded-md px-3 py-2 w-full sm:w-1/2 md:w-1/3'
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