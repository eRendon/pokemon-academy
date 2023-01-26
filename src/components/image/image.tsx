import React from 'react'
import { UseApiStats } from './contextProviderStats'

export function Image() {
  const { sprites } = UseApiStats()
  return (
    <img className="w-20 h-20 rounded-full" src={sprites.back_default} alt={sprites.back_default}/>
  )
}

