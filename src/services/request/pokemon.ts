import { SurePromise } from '../../model/SurePromise'
import { PokemonModel, PokemonsModel, PokemonSpecies, Region } from '../../model/PokemonModel'
import { AxiosService } from '../axios/axiosService'

export default class Pokemon {
  
  private static axiosService = new AxiosService<PokemonsModel>()
  private static axiosSingleService = new AxiosService<PokemonModel | PokemonSpecies>()

  static async getPokemon (url: string): Promise<SurePromise<PokemonsModel>> {
    try {
      return await this.axiosService!.getData(url)
    }
    catch (e) {
      throw e
    }
  }

  static async getPokemonDetail (name: string): Promise<SurePromise<PokemonModel | PokemonSpecies>> {
    try {
      return await this.axiosSingleService!.getData(`pokemon/${name}`)
    }
    catch (e) {
      throw e
    }
  }

  static async getDescription (id: number): Promise<SurePromise<PokemonModel | PokemonSpecies>> {
    try {
      return await this.axiosSingleService!.getData(`pokemon-species/${id}`)
    }
     catch (e) {
      throw e
     }
  }

  static async getGeneration (id: number) {
    const axiosService = new AxiosService()
    return axiosService.getData(`generation/${id}`)
  }

  static async getRegion (id: number): Promise<SurePromise<Region>> {
    const axiosService = new AxiosService<Region>()

    try {
      return await axiosService.getData(`location/${id}`)
    } catch (e) {
      throw e
    }
  }
}
