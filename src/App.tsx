import { useEffect, useState } from 'react'
import './App.css'
import Pokemon from './services/request/pokemon'
import { PokemonModel } from './model/PokemonModel'
import Navbar from './components/header/navbar'
import LifeStats from './components/pokemon-stats/life-stats'
import { ContextProviderStats } from './components/image/contextProviderStats'
import { Image } from './components/image/image'
import { Description } from './components/pokemon-stats/description'
import { TypeName } from './components/pokemon-stats/type'

export default function App() {
  const [pokemons, setPokemons] = useState([] as PokemonModel[])
  const [pokemonName, setPokemonName] = useState('')

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

  return (
    <div className='app'>
      <Navbar onSearch={searchPokemon}></Navbar>
      <div className="py-8 w-full">
        <div className="lg:grid grid-cols-2 gap-4">
          {pokemons.filter((pokemon) => {
            if (!pokemonName) {
              return pokemon
            } else if (pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())) {
              return pokemon
            }
          }).map((pokemon, key) => {
            return (
              <ContextProviderStats key={key} name={pokemon.name}>
                <div  className="lg:mb-0 bg-white p-6 shadow-md rounded w-full cursor-pointer">
                  <div className="flex items-center border-b border-gray-200 pb-6">
                    <Image></Image>
                    <div className="flex items-start justify-between w-full">
                      <TypeName name={pokemon.name}></TypeName>
                      <svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z" stroke="#2C3E50" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="px-2">
                    <Description></Description>
                    <LifeStats ></LifeStats>
                  </div>
                </div>
              </ContextProviderStats>
            )
          })}
        </div>
      </div>
    </div>
  )
}

