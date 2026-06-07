import { useRef, useState } from 'react'

import './App.css'
// import { useEffect } from 'react'

function App() {
  // const [count, setCount] = useState(0)

  // const a = useRef(0)
const [todos, settodos] = useState([
  {
    title : "hey",
    disc : "hello first todo"

  },
  {
    title : "hello",
    disc : "hello sec todo"

  },
  {
    title : "hey",
    disc : "hello third todo"

  },
  {
    title : "hey",
    disc : "hello fourth todo"

  }
])


const Todo = ({todo}) =>{

  return(<>
  
  <div>

    <p>
      {todo.title}
      {todo.disc}
    </p>

  </div>
  
  </>)

}


todos.map(todo=>{
  return <Todo todo={todo} />
})

  // useEffect(()=>
  //   {

  //     alert(`lert on every reload ${a.current}`)
  //     a.current = a.current +1


  //   },[])

  // useEffect(()=>
  //   {

  //     alert(`alert on every render  ${a.current}`)
  //     a.current = a.current +1

  //   })

  // useEffect(()=>
  //   {

  //     alert(`alert on every change on count ${a.current}`)
  //           a.current = a.current +1


  //   },[count])



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
