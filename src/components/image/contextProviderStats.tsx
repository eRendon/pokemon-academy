import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react'
import { PokemonModel, PokemonSpecies, Sprites, Stats, Types } from '../../model/PokemonModel'
import Pokemon from '../../services/request/pokemon'
import { SurePromise } from '../../model/SurePromise'
import { useNavigate } from 'react-router-dom'

const APIContext = createContext({
  sprites: {} as Sprites,
  stats: [] as Stats[],
  description: {} as PokemonSpecies,
  types: [] as Types[]
})

export function ContextProviderStats({ children, name = '' }: { children: ReactElement, name?: string }) {

  const [sprites, setSprites] = useState({} as Sprites)
  const [stats, setStats] = useState([] as Stats [])
  const [description, setDescription] = useState({} as PokemonSpecies)
  const [types, setTypes] = useState([] as Types[])
  const navigate = useNavigate()

  useEffect(() => {
    getSprite(name)
  }, [])

  const getSprite = async (name: string): Promise<void> => {
    try {
      const { data } = await Pokemon.getSprite(name) as unknown as SurePromise<PokemonModel>
      const { sprites, stats, id, types } = data
      setSprites(sprites)
      setStats(stats)
      setTypes(types)
      await getDescription(id)
    } catch (e) {
      throw e
    }
  }
  
  const getDescription = async (id: number): Promise<void> => {
    try {
      const { data } = await Pokemon.getDescription(id) as unknown as SurePromise<PokemonSpecies>
      setDescription(data)
    }
    catch (e) {

    }
  }

  const detailPokemon = (pokemonDetail: PokemonSpecies) => {
    navigate('detail', { state: { detail: pokemonDetail, sprites, types, stats }})
  }

  return (
    <APIContext.Provider value={{sprites, stats, description, types }}>
      <div onClick={() => detailPokemon(description)}>
        {children}
      </div>
    </APIContext.Provider>
  )
}

export function UseApiStats() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
