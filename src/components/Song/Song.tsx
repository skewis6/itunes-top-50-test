import React from 'react'
import { SongProps } from './types'

const Song = ({ song }: SongProps) => {
  return (
    <div className='max-w-[170px]'>
      <img src={song['im:image'][2].label} alt={song['im:name'].label} />
      <h2 className='font-bold'>{song['im:name'].label}</h2>
      <p>{song['im:artist'].label}</p>
      <span className='inline-block px-2 py-1 rounded-2xl bg-slate-300 mt-2 text-xs'>{song.category.attributes.label}</span>
    </div>
  )
}

export default Song