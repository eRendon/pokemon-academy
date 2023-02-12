import { UseApiStats } from '../../services/providers/contextProviderStats'
import React from 'react'
import { useLocation } from 'react-router-dom'

function LifeStats() {
  const { stats, pokemon, description } = UseApiStats()
  const location = useLocation()
  const filterGeneration = (generation: string): string => {
    if (generation) {
      return generation.replace(/generation-/g, '')
    }
    return ''
  }

  const renderStats = () => {
    if (location.pathname !== '/detail') {
      return (
        <div >
          <div>
            <div className='lg:grid grid-cols-4 gap-2 grid text-left'>
              <div className='test-stats capitalize '>peso</div>
              <div className='text-left font-bold'>~ {pokemon.weight}</div>
              <div>Generacion</div>
              <div className=' capitalize font-bold text-left'>{filterGeneration(description.generation?.name)}</div>
            </div>
            <div className='lg:grid grid-cols-4 gap-2 grid text-left'>
              <div className='test-stats capitalize text-left'>Altura</div>
              <div className='text-left font-bold'>~ {pokemon.height}</div>
              <div>Inicial</div>
              <div className='capitalize font-bold'>{description.evolves_from_species?.name || 'N/A'}</div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <></>
      )
    }
  }

  return (
    <div>
      <div className='stats-pokemon lg:grid grid-cols-3 gap-2 w-full grid'>
        <div className='font-bold'>#{pokemon.id}</div>
        {
          stats.map((state, key) => {
            switch (state.stat.name) {
              case 'hp':
                return (
                  <div key={key} className='grid grid-cols-2'>
                    <div className=" uppercase">Max Hp</div>
                    <div className='hp-stat'>{state.base_stat}<small>Hp</small></div>
                  </div>
                )
              case 'attack':
                return (
                  <div key={key} className='grid grid-cols-2'>
                    <div className=" uppercase">Max Hp</div>
                    <div className='attack-stat'>{state.base_stat}<small>Hp</small></div>
                  </div>
                )
            }
          })
        }
      </div>

      {renderStats()}
    </div>
  )

}

export default LifeStats
