import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { DetailPokemon } from '../views/detailPokemon'
import { Comparison } from '../views/comparison'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'detail',
    element: <DetailPokemon/>
  },
  {
    path: 'comparison',
    element: <Comparison/>
  }
])

export default routes
