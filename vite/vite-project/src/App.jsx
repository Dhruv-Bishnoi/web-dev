import { useEffect, useState } from 'react'

import './App.css'




function App() {
  useEffect(()=>{
    const a =  fetch("https://jsonplaceholder.typicode.com/todos/1")
    console.log(a)
   
  }, [])
  


return (
    <>

hello

    </>
  )
}

export default App
