import { useState } from 'react'
import Player from './Player'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
        <p className='bg-red-100 text-center'>Walk Listner</p>
        <Player></Player>
    </>
  )
}

export default App
