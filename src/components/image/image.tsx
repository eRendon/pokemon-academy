import React from 'react'
import { UseApiStats } from '../../services/providers/contextProviderStats'

export function Image() {
  const { sprites } = UseApiStats()
  return (
    <img className="w-20 h-20 rounded-full" src={sprites.front_default} alt={sprites.front_default}/>
  )
}

