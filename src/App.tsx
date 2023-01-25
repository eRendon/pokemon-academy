import { useState } from 'react'
import './App.css'
import Card from './components/card/card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Card></Card>
    </div>
  )
}

export default App
