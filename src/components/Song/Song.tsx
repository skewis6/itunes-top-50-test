import React from 'react'
import { SongProps } from './types'

const Song = ({ song }: SongProps) => {
  return (
    <div>
      <img src={song['im:image'][2].label} alt={song['im:name'].label} />
    </div>
  )
}

export default Song