import { useRef, useState } from 'react'

import './App.css'
import { useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)

  const a = useRef(0)

  useEffect(()=>
    {

      alert(`lert on every reload ${a.current}`)
      a.current = a.current +1


    },[])

  useEffect(()=>
    {

      alert(`alert on every render  ${a.current}`)
      a.current = a.current +1

    })

  useEffect(()=>
    {

      alert(`alert on every change on count ${a.current}`)
            a.current = a.current +1


    },[count])

  return (
    <>
      <section id="center">
      
       
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

    

    </>
  )
}

export default App
