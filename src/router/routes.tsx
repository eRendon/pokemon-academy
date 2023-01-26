import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { DetailPokemon } from '../views/detailPokemon'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'detail',
    element: <DetailPokemon/>
  }
])

export default routes
