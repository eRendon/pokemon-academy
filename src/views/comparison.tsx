import { Detail } from '../components/card/detail'
import Pokemon from '../services/request/pokemon'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PokemonModel, PokemonSpecies, Region } from '../model/PokemonModel'
import { SurePromise } from '../model/SurePromise'
import { StatsPokemon } from '../components/card/stats-pokemon'
import Navbar from '../components/header/navbar'
import { Image } from '../components/image/image'

interface LocationState {
  firstPokemon: PokemonModel
  secondPokemon: PokemonModel
}

export function Comparison() {

  const location = useLocation()
  const state = location.state as LocationState
  const [firstPokemon, setFirstPokemon] = useState({} as PokemonModel)
  const [secondPokemon, setSecondPokemon] = useState({} as PokemonModel)
  const [firstRegion, setFirstRegion] = useState({} as Region)
  const [secondRegion, setSecondRegion] = useState({} as Region)
  const [firstSpecies, setFirstSpecies] = useState({} as PokemonSpecies)
  const [secondSpecies, setSecondSpecies] = useState({} as PokemonSpecies)

  useEffect(() => {
    if (!firstPokemon.name) {
      getDetailsFirstPokemon(state.firstPokemon.name)
    }
    if (!secondPokemon.name) {
      getDetailsSecondPokemon(state.secondPokemon.name)
    }
  }, [])

  const getDetailsFirstPokemon = async (name: string): Promise<void> => {
    const { data } = await Pokemon.getPokemonDetail(name) as unknown as SurePromise<PokemonModel>
      setFirstPokemon(data)
      await getRegionFirstPokemon(data.id)
      await getDescriptionFirstPokemon(data.id)
  }

  const getDetailsSecondPokemon = async (name: string): Promise<void> => {
    const { data } = await Pokemon.getPokemonDetail(name) as unknown as SurePromise<PokemonModel>
    setSecondPokemon(data)
    await getRegionSecondPokemon(data.id)
    await getDescriptionSecondPokemon(data.id)
  }

  const getRegionFirstPokemon = async (id: number) => {
    try {
      const { data } = await Pokemon.getRegion(id)
      setFirstRegion(data)
    } catch (e) {

    }
  }

  const getRegionSecondPokemon = async (id: number) => {
    try {
      const { data } = await Pokemon.getRegion(id)
      setSecondRegion(data)
    } catch (e) {

    }
  }

  const getDescriptionFirstPokemon = async (id: number): Promise<void> => {
    try {
      const { data } = await Pokemon.getDescription(id) as unknown as SurePromise<PokemonSpecies>
        setFirstSpecies(data)
    }
    catch (e) {

    }
  }

  const getDescriptionSecondPokemon = async (id: number): Promise<void> => {
    try {
      const { data } = await Pokemon.getDescription(id) as unknown as SurePromise<PokemonSpecies>
      setSecondSpecies(data)

    }
    catch (e) {

    }
  }

  return (
    <div>
      <Navbar/>
      <div className='grid grid-cols-2 gap-2'>
        <div className='flex flex-col'>
          <Image image={firstPokemon.sprites?.front_default}></Image>
          <StatsPokemon region={firstRegion}
                        stats={firstPokemon.stats}
                        name={firstPokemon.name}
                        generation={firstSpecies.generation?.name}
                        weight={firstPokemon.weight}
                        height={firstPokemon.height}
                        varieties={firstSpecies.varieties}
                        sprites={firstPokemon.sprites!}/>
        </div>
        <div className='flex flex-col'>
          <Image image={secondPokemon.sprites?.front_default}></Image>
          <StatsPokemon region={secondRegion}
                        stats={secondPokemon.stats}
                        name={secondPokemon.name}
                        generation={secondSpecies.generation?.name}
                        weight={secondPokemon.weight}
                        height={secondPokemon.height}
                        varieties={secondSpecies.varieties}
                        sprites={secondPokemon.sprites!}/>
        </div>
      </div>
    </div>
  )
}
