import React, { ReactNode } from 'react'
import { Region, Sprites, Stats, Varieties } from '../../model/PokemonModel'

interface Props {
  region: Region
  stats: Stats[]
  name: string
  generation: string
  weight: number
  height: number
  varieties:  Varieties[]
  sprites: Sprites
}
export function StatsPokemon (props: Props) {

  const filterGeneration = (generation: string): string => {
    if (generation) {
      return generation.replace(/generation-/g, '')
    }
    return ''
  }

  const renderStats = (stat: number): ReactNode => {
    return (
      <small>{stat}</small>
    )
  }

  const filterStat = (stat: 'attack' | 'speed' | 'hp' | 'defense' | 'special-attack' | 'special-defense'): number => {
    if (props.stats) {
      const result = props.stats.find((statePokemon) => statePokemon.stat.name === stat)
      if (result) {
        return result.base_stat
      }
      return 0
    } else {
      return 0
    }
  }

  return (
    <div className='card-detail  text-left p-5 rounded-xl'>
      <h2 className='uppercase'>{props.name}</h2>
      <div className='grid grid-cols-10 gap-2 items-center'>
        <div className='detail-title col-span-3'>
          Generacion:
        </div>
        <a className='col-span-7'>
          {filterGeneration(props.name)}
        </a>
        <div className='detail-title col-span-3'>
          Region:
        </div>
        <a className='capitalize col-span-7'>
          { props.region.region?.name }
        </a>
        <div className='detail-title col-span-3'>
          Peso:
        </div>
        <div className='col-span-7'>
          ~ { props.weight } kg
        </div>
        <div className='detail-title col-span-3'>
          Tamano:
        </div>
        <div className='col-span-7'>
          ~{ props.height } m
        </div>
        <div className='detail-title col-span-3'>
          Ataque: { (renderStats(filterStat('attack'))) }
        </div>
        <div className="bar-stats col-span-7 h-1.5 rounded-full dark:bg-blue-500" style={{ width: filterStat('attack') + 'px' }}></div>
        <div className='detail-title col-span-3'>
          Defensa: { (renderStats(filterStat('defense'))) }
        </div>
        <div className="bar-stats col-span-7 h-1.5 rounded-full dark:bg-blue-500" style={{ width: filterStat('defense') + 'px' }}></div>
        <div className='detail-title col-span-3'>
          Ataque especial: { (renderStats(filterStat('special-attack'))) }
        </div>
        <div className="bar-stats col-span-7 h-1.5 rounded-full dark:bg-blue-500" style={{ width: filterStat('special-attack') + 'px' }}></div>
        <div className='detail-title col-span-3'>
          Variantes:
        </div>
        <div className='col-span-7'>
          { props.varieties?.map((item, key) => {
            return (
              <a key={key} className='capitalize'>
                { item.pokemon.name } { key === props.varieties.length - 1 ? '' : ' / '}
              </a>
            )
          })}
        </div>
      </div>
      <div className="grid grid-cols-2 mt-8">
        <div className="flex items-center">
          <div className="relative">
            <div className="rounded-full w-6 h-6 md:w-12 md:h-12 bg-gray-200"></div>
            <img className="w-12 h-12 rounded-full absolute top-0 right-0 inline-block bg-primary-red rounded-full" src={props.sprites!?.back_default} alt="Rounded avatar"/>

          </div>

          <p className="ml-2 text-gray-800 line-clamp-1 capitalize">
            {props.name}
          </p>
        </div>
      </div>
    </div>
  )
}
