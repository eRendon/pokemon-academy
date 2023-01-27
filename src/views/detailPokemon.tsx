import Navbar from '../components/header/navbar'
import { useLocation } from 'react-router-dom'
import { PokemonModel, PokemonSpecies } from '../model/PokemonModel'
import { ReactNode } from 'react'

interface LocationState {
  detail: PokemonSpecies
  pokemonDetails: PokemonModel
}


export function DetailPokemon( ) {
  const  location  = useLocation()
  const state = location.state as LocationState

  const renderStats = (stat: 'attack' | 'speed' | 'hp' | 'defense' | 'special-attack' | 'special-defense'): ReactNode => {
    const result = state.pokemonDetails.stats.find((statePokemon) => statePokemon.stat.name === stat)
    if (result)
      return (
      <small>{result.base_stat}</small>
    )
  }

  const renderDescription = (): ReactNode => {
    const description = state.detail.flavor_text_entries.filter((entries) => entries.language.name === 'es')
    return (
      <p className="mt-2 text-sm text-gray-800 line-clamp-1" title="New York, NY 10004, United States">
        {description[0].flavor_text}
      </p>
    )
  }

  return (
    <div>
      <Navbar/>
      <div className="w-4/12 xs:w-full sm:w-8/12 md:w-4/12  mr-auto ml-auto">
        <div className="relative mx-auto w-full">
          <a className='relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full'>
            <div className="shadow p-4 rounded-lg bg-white">
              <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
                <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                  <img className="w-6/12 mr-auto ml-auto" src={state.pokemonDetails.sprites.front_default}/>
                  <div className="absolute inset-0 bg-black opacity-10"></div>
                </div>

                <div className="absolute flex justify-center bottom-0 mb-3">
                  <div className={`flex px-4 py-1 space-x-5 rounded-lg overflow-hidden shadow bg-${state.detail.color.name}-300`}>
                  <p data-tooltip-target="tooltip-hover" data-tooltip-trigger="hover" className="flex text-white items-center font-medium text-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor" className="w-5 h-5">
                        <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                      </svg>

                      {
                        renderStats('hp')
                      }
                    </p>
                    <p className="flex text-white items-center font-medium text-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      {
                        renderStats('defense')
                      }
                    </p>
                  </div>
                </div>

                <span className={`absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 text-sm font-medium text-white select-none bg-${state.detail.color.name}-300`}>
                  { state.pokemonDetails.types.map((type, key) => {
                     if (state.pokemonDetails.types.length -1 !== key) {
                      return (
                        <span key={key}>{type.type.name.toUpperCase()+'/' }</span>
                       )
                       } else {
                         return (
                          <span key={key}>{type.type.name.toUpperCase()}</span>
                          )
                      }
                     })
                     }
                </span>
              </div>

              <div className="mt-4">
                <h2 className="font-medium text-base md:text-lg text-gray-800 line-clamp-1" title="New York">
                  {state.detail.name.toUpperCase()}
                </h2>
                {
                  renderDescription()
                }
              </div>
              <div className=" mt-8">
                 <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex flex-row justify-between pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Peso</dt>
                        <dd className="text-lg font-semibold"><small>{state.pokemonDetails.weight}</small></dd>
                    </div>
                    <div className="flex flex-row justify-between pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Altura</dt>
                        <dd className="text-lg font-semibold"><small>{state.pokemonDetails.height}</small></dd>
                    </div>
                    <div className="flex flex-row justify-between pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Velocidad</dt>
                        <dd className="text-lg font-semibold">{renderStats('speed')}</dd>
                    </div>
                    <div className="flex flex-row justify-between pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Ataque</dt>
                        <dd className="text-lg font-semibold">{renderStats("attack")}</dd>
                    </div>
                    <div className="flex flex-row justify-between pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Ataque Especial</dt>
                        <dd className="text-lg font-semibold">{renderStats("special-attack")}</dd>
                    </div>
                    <div className="flex flex-row justify-between pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Defensa Especial</dt>
                        <dd className="text-lg font-semibold">{renderStats("special-defense")}</dd>
                    </div>
                </dl>

              </div>

              <div className="grid grid-cols-2 mt-8">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="rounded-full w-6 h-6 md:w-12 md:h-12 bg-gray-200"></div>
                    <img className="w-12 h-12 rounded-full absolute top-0 right-0 inline-block bg-primary-red rounded-full" src={state.pokemonDetails.sprites.back_default} alt="Rounded avatar"/>

                  </div>

                  <p className="ml-2 text-gray-800 line-clamp-1 capitalize">
                    {state.pokemonDetails.name}
                  </p>
                </div>

                <div className="flex items-center justify-end">
                  <p className="inline-block capitalize font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                    <span className="text-lg">{state.detail.generation.name}</span>
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
