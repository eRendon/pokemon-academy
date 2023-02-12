import Navbar from '../components/header/navbar'
import { useLocation } from 'react-router-dom'
import { PokemonModel, PokemonSpecies, Region } from '../model/PokemonModel'
import React, { ReactNode, useEffect, useState } from 'react'
import { ContextProviderStats } from '../services/providers/contextProviderStats'
import { Detail } from '../components/card/detail'
import Pokemon from '../services/request/pokemon'

interface LocationState {
  detail: PokemonSpecies
  pokemonDetails: PokemonModel,
  region: Region
}

export function DetailPokemon( ) {
  const  location  = useLocation()
  const state = location.state as LocationState
  const [region, setRegion] = useState({} as Region)

  useEffect(() => {
    getRegion(state.pokemonDetails.id)
  }, [])

  const getRegion = async (id: number) => {
    try {
      const { data } = await Pokemon.getRegion(id)
      setRegion(data)
    } catch (e) {

    }
  }




  return (
    <div>
      <Navbar/>
      <ContextProviderStats name={state.detail.name}>
        <Detail height={state.pokemonDetails.height}
                styleCard='w-4/12 xs:w-full sm:w-8/12 md:w-5/12  mr-auto ml-auto'
                weight={state.pokemonDetails.weight}
                sprites={state.pokemonDetails.sprites!}
                generation={state.detail.generation.name}
                name={state.detail.name}
                flavor_text_entries={state.detail.flavor_text_entries}
                stats={state.pokemonDetails.stats}
                varieties={state.detail.varieties}
                region={region}/>
      </ContextProviderStats>
    </div>
  )
}
