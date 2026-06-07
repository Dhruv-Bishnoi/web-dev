import { useState } from 'react'

import './App.css'


function App() {
  const [count, setCount] = useState(0)

  const [todos, settodos] = useState([
    {
      title:"hey",
      disc:"hey how are you first"
    },
    {
      title:"hello",
      disc:"hey how are you sec"
    },
    {
      title:"huhuhuh",
      disc:"hey how are you third"
    },
  ])

  const Todo = ({todos})=>{
 return (
    <>
<div className=" border-2 m-8  border bg-danger border-white">
    <div className="Todos text-3xl font-bold underline">{todos.title}</div>
    <div className="Todos">{todos.disc}</div>
    </div>
    </>)
  } 

  return (
    <>

    {todos.map(todo=>{
      return <Todo todos={todo}/> 
    })}




    </>
  )
}

export default App
