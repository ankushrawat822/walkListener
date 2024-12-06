import { useState } from 'react'
import Player from './Player'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
        <p className='bg-red-100'> click </p>
        <Player></Player>
    </>
  )
}

export default App
