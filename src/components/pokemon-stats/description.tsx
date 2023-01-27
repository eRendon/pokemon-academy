import { UseApiStats } from '../../services/providers/contextProviderStats'
import { FlavorTextEntries } from '../../model/PokemonModel'

export function Description() {
  const { description } = UseApiStats()
  let filteredDescription: FlavorTextEntries[] = []
  if (description.flavor_text_entries) {
    filteredDescription = description.flavor_text_entries.filter((entries) =>
      entries.language.name === 'es'
    ).filter((entries) => {
      return entries
    })
  }

  if (filteredDescription[0]) {
    return (
      <p className="text-sm leading-5 py-4 text-gray-600">{filteredDescription[0].flavor_text}</p>
    )
  } else {
    return (
      <></>
    )
  }
}
