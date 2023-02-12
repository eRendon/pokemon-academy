import { UseApiStats } from '../../services/providers/contextProviderStats'

export function TypeName({ name }: { name: string }) {

  const { types } = UseApiStats()

  return (
    <div className='text-left w-full'>
      <p className="text-xl font-medium leading-5 pokemon-name">{name.toUpperCase()}</p>
      { types.map((type, key) => {
        if (types.length -1 !== key) {
          return (
            <span key={key} className='type-pokemon'>{type.type.name.toUpperCase()+' / '}</span>
          )
        } else {
          return (
            <span key={key} className='type-pokemon'>{type.type.name.toUpperCase()}</span>
          )
        }
      })
      }
    </div>
  )
}
