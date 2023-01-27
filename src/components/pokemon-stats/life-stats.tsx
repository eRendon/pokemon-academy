import { UseApiStats } from '../../services/providers/contextProviderStats'

function LifeStats() {
  
  const { stats } = UseApiStats()

  return (
    <div className='flex justify-end'>
      {
        stats.map((state, key) => {
          switch (state.stat.name) {
            case 'hp':
              return (
                <div key={key} className="py-2 px-4 text-xs leading-3 text-white rounded-full bg-emerald-300"> <span>Max Hp: </span>{state.base_stat}</div>
              )
            case 'attack':
              return (
                <div key={key} className="py-2 px-4 text-xs leading-3 text-white rounded-full bg-fuchsia-300"> <span>Ataque: </span>{state.base_stat}</div>
              )
            case 'defense':
              return (
                <div key={key} className="py-2 px-4 text-xs leading-3 text-white rounded-full bg-red-300"> <span>Defensa: </span>{state.base_stat}</div>
              )
            case 'speed':
              return (
                <div key={key} className="py-2 px-4 text-xs leading-3 text-white rounded-full bg-indigo-300"> <span>Velocidad: </span>{state.base_stat}</div>
              )
          }
        })
      }
    </div>
  )

}

export default LifeStats
