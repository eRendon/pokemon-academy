

export interface PokemonsModel {
  count: number
  next: string
  previous: any
  results: PokemonModel[]
}

export interface PokemonModel extends Stat {
  abilities: []
  base_experience: number
  forms: []
  game_indices: []
  height: number
  held_items: []
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: []
  order: number
  past_types: []
  species: {}
  sprites: Sprites
  stats: Stats[]
  types: Types[]
  weight: number
}

export interface Types {
  slot: number
  type: Stat
}

interface Stat {
  name: string
  url: string
}

export interface Stats {
  base_stat: number
  effort: number
  stat: Stat
}

export interface Sprites {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
  other: {}
  versions: {}
}

export interface PokemonSpecies {
  flavor_text_entries: FlavorTextEntries[]
  name: string
  generation: Stat
  color: Stat
}

export interface FlavorTextEntries {
  flavor_text: string
  language: Stat
  version: Stat
}
