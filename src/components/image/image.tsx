import React from 'react'
import { UseApiStats } from '../../services/providers/contextProviderStats'

export function Image({ image }: { image?: string }) {
  const { sprites } = UseApiStats()
  return (
    <img className="rounded-full flex self-center justify-self-center" src={sprites.front_default || image } alt={sprites.front_default}/>
  )
}

