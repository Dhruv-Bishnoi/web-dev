import './App.css'
import { useEffect, useState } from 'react'

function App() {

  const [Todo, setTodo] = useState("")

 const [REALtodo, setREALtodo] = useState(() => {

  const savedTodos =
    localStorage.getItem("REALtodo")

  return savedTodos
    ? JSON.parse(savedTodos)
    : []

})
useEffect(() => {

  localStorage.setItem(
    "REALtodo",
    JSON.stringify(REALtodo)
  )

}, [REALtodo])
  

  const HandelTodo = (e) => {
    setTodo(e.target.value)
  }

  const Handlesbt = () => {

    if (Todo.trim() === "") return

    setREALtodo([
      ...REALtodo,
      {
        id: Date.now(),
        todo: Todo,
        Tick: false
      }
    ])

    setTodo("")
   
  }

  const tickhandle = (id) => {

    setREALtodo(

      REALtodo.map((item) =>

        item.id === id
          ? { ...item, Tick: !item.Tick }
          : item

      )

    )
       


  }

  const deletetodo = (id) => {

    setREALtodo(

      REALtodo.filter(
        (item) => item.id !== id
      )

    )
       


  }

  return (
    <div className="bg-purple-100 h-screen flex justify-center items-center w-screen">

      <div className="bg-purple-200 rounded-xl shadow-sm w-[40%] h-[80%] overflow-y-auto">

        <div className="flex justify-center items-center py-4">
          <h1 className="text-xl font-bold">
            DoIt - Manage your Todo at one place
          </h1>
        </div>

        <div className="m-5">

          <h2 className="font-semibold">Add Todo</h2>

          <div className="flex gap-3 items-center">

            <input
              type="text"
              value={Todo}
              onChange={HandelTodo}
              placeholder="Enter Todo"
              className="bg-white rounded-2xl my-5 p-2 w-[90%]"
            />

            <button
              onClick={Handlesbt}
              className="rounded-2xl bg-purple-400 px-4 py-2"
            >
              Save
            </button>

          </div>

          <div className="flex items-center gap-2">

            <svg
              fill="#ffffff"
              className="bg-blue-400 rounded-sm w-5"
              viewBox="0 0 1024 1024"
            >
              <path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z"></path>
            </svg>

            <span>Show Finished</span>

          </div>

          <div className="items-center flex py-4 justify-center">

            <div className="w-[90%] bg-gray-400 h-[2px]"></div>

          </div>

          <h3 className="font-semibold mb-4">
            Your Todos
          </h3>

          {
            REALtodo.map((item) => (

              <div
                key={item.id}
                className="flex justify-between items-center py-2"
              >

                <div className="flex gap-4 items-center">

                  <svg
                    fill="#ffffff"
                    onClick={() => tickhandle(item.id)}
                    className={`
                      ${item.Tick ? "bg-blue-400" : "bg-black"}
                      rounded-sm
                      w-5
                      cursor-pointer
                    `}
                    viewBox="0 0 1024 1024"
                  >
                    <path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z"></path>
                  </svg>

                  <p
                    className={
                      item.Tick
                        ? "line-through text-gray-500"
                        : ""
                    }
                  >
                    {item.todo}
                  </p>

                </div>

                <div className="gap-3 flex">

                  <button className="text-blue-600">
                    Edit
                  </button>

                  <button
                    onClick={() => deletetodo(item.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  )
}

export default App