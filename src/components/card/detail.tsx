import { Image } from '../image/image'
import LifeStats from '../pokemon-stats/life-stats'
import React, { ReactNode } from 'react'
import {
  FlavorTextEntries,
  PokemonModel,
  PokemonSpecies,
  Region,
  Sprites,
  Stats,
  Varieties
} from '../../model/PokemonModel'
import { StatsPokemon } from './stats-pokemon'

interface LocationState {
  detail: PokemonSpecies
  pokemonDetails: PokemonModel,

  region: Region
}

export interface PropsDetail {
  region: Region
  stats: Stats[]
  flavor_text_entries: FlavorTextEntries[]
  name: string
  generation: string
  weight: number
  height: number
  varieties:  Varieties[]
  sprites: Sprites
  styleCard: string
}

export function Detail(props: PropsDetail) {

  const renderDescription = (): ReactNode => {
    if (props.flavor_text_entries) {
      const description = props.flavor_text_entries.filter((entries) => entries.language.name === 'es')
      return (
        <p className="mt-2 text-sm text-gray-800 line-clamp-1 text-justify">
          {description[0].flavor_text}
        </p>
      )
    } else {
      return <></>
    }
  }

  return (
    <div className={props.styleCard}>
      <div className='grid grid-cols-6 gap-2'>
        <div className='col-span-2 transition-transform duration-500 transform ease-in-out hover:scale-110 w-full'>
          <Image></Image>
        </div>
        <div className='col-span-4'>
          { renderDescription() }
        </div>
      </div>
      <LifeStats></LifeStats>
      <StatsPokemon region={props.region}
                    stats={props.stats}
                    name={props.name}
                    generation={props.generation}
                    weight={props.weight}
                    height={props.height}
                    varieties={props.varieties}
                    sprites={props.sprites}/>
    </div>
  )
}
