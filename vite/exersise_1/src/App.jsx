import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [todo, setTodo] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(          'https://jsonplaceholder.typicode.com/todos'
)
      .then((response) => response.json())
      .then((data) => {
        setTodo(data)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [])


  const [form, setform] = useState({email:"" , phone:""})

  const handleinput = (e)=>{

    setform({...form,[e.target.name]:e.target.value})
    
  }
  
  return (

     
      
    
    <>

    <div className="top">
      <input type="text" onChange={handleinput} name='email' value={form.email} />
      <input type="text" onChange={handleinput} name='phone' value={form.phone} />
    </div>
{    console.log(form)
}

      <h1>Todo</h1>
      {todo.map(post=>(
          
                  <div
          key={post.id}
          style={{
            border: "1px solid white",
            margin: "10px",
            padding: "10px"
          }}
        >



<p><strong>Title:</strong> {post.title}</p>
<p><strong>Completed:</strong> {post.completed ? 'Yes' : 'No'}</p>
<p><strong>todo ID:</strong> {post.id}</p>
        </div>


      ))}
      
    </>
  )
}

export default App
