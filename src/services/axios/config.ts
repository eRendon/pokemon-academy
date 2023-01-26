import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  headers: {
    'Content-type': 'application/json'
  }
})

export { apiClient }
