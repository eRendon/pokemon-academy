import { UseApiStats } from '../../services/providers/contextProviderStats'

export function TypeName({ name }: { name: string }) {

  const { types } = UseApiStats()

  return (
    <div className='pl-3 w-full'>
      <p className="text-xl font-medium leading-5 text-gray-800">{name.toUpperCase()}</p>
      { types.map((type, key) => {
        if (types.length -1 !== key) {
          return (
            <span key={key}>{type.type.name.toUpperCase()+' / '}</span>
          )
        } else {
          return (
            <span key={key}>{type.type.name.toUpperCase()}</span>
          )
        }
      })
      }
    </div>
  )
}
