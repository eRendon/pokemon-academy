import React, { ReactNode, useEffect, useState } from 'react'
import './App.css'
import Pokemon from './services/request/pokemon'
import { PokemonModel } from './model/PokemonModel'
import Navbar from './components/header/navbar'
import { ContextProviderStats } from './services/providers/contextProviderStats'
import { Image } from './components/image/image'
import { TypeName } from './components/pokemon-stats/type'
import LifeStats from './components/pokemon-stats/life-stats'
import { useNavigate } from 'react-router-dom'
export default function App() {
  const [pokemons, setPokemons] = useState([] as PokemonModel[])
  const [pokemonName, setPokemonName] = useState('')
  const [firstPokemon, setFirstPokemon] = useState({} as PokemonModel)
  const [secondPokemon, setSecondPokemon] = useState({} as PokemonModel)
  const navigate = useNavigate()

  const pokemonModel: PokemonModel = {
    abilities: [],
    base_experience: 0,
    forms: [],
    game_indices: [],
    height: 0,
    held_items: [],
    id: 0,
    is_default: false,
    location_area_encounters: '',
    moves: [],
    order: 0,
    past_types: [],
    species: {},
    stats: [],
    types: [],
    url: '',
    weight: 0,
    name: ''
  }

  useEffect(() => {
    getPokemons()
  }, [])

  const getPokemons = (): void => {
    Pokemon.getPokemon('pokemon').then((response) => {
      setPokemons(response.data.results)
    })
  }

  const searchPokemon = (event: string): void => {
    setPokemonName(event)
  }

  const goToComparison = (): void => {
    navigate('comparison', { state: { firstPokemon, secondPokemon }})
  }

  const renderButtonComparison = (): ReactNode => {
    if (firstPokemon.name && secondPokemon.name) {
      return (
        <button type="button"
                onClick={goToComparison}
                className="py-2.5 button-comparison px-5 fixed bottom-4 right-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Comparar
        </button>
      )
    }
    return <></>
  }

  const toCompare = (pokemon: PokemonModel) => {
    console.log(pokemon)
    if (firstPokemon.name === pokemon.name) {
      setFirstPokemon(pokemonModel)
      return
    }
    if (secondPokemon.name === pokemon.name) {
      setSecondPokemon(pokemonModel)
      return
    }

     if (!firstPokemon.name) {
      setFirstPokemon(pokemon)
    } else {
      setSecondPokemon(pokemon)
    }
  }

  return (
    <div className='app'>
      <Navbar onSearch={searchPokemon}/>
      <div>
        <div className='md:grid grid-cols-2 gap-4'>
          { pokemons.filter((pokemon) => {
            if (!pokemonName) {
              return pokemon
            } else if (pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())) {
              return pokemon
            }
          }).map((pokemon, key) => {
            return (
              <ContextProviderStats  key={key} name={pokemon.name}>
                <div className='lg:grid grid-cols-4 gap-4 grid border-b-2 md:border-2 md:shadow-lg rounded p-5 cursor-pointer relative'>
                  <div className='transition-transform duration-500 transform ease-in-out hover:scale-110 w-full'>
                    <Image></Image>
                  </div>
                  <div onClick={(e) => {e.stopPropagation(); toCompare(pokemon)}} className='absolute right-0'>
                    <svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill={firstPokemon.name?.toLowerCase() === pokemon.name?.toLowerCase() || secondPokemon.name?.toLowerCase() === pokemon.name?.toLowerCase() ? '#71edb9' : ''} d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z" stroke="#2C3E50" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className='col-span-3'>
                    <TypeName name={pokemon.name}></TypeName>
                    <LifeStats></LifeStats>
                  </div>
                </div>
              </ContextProviderStats>
            )
          })
          }
        </div>
        {renderButtonComparison()}

      </div>
    </div>
  )
}


