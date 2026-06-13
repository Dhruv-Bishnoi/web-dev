
import './App.css'
import { useState } from 'react'

function App() {

const [tick, settick] = useState(false)
  const tickhandle = (e)=>{
    settick(!tick)
  }

  return (
    <>
      <div className=" bg-purple-100 h-screen flex justify-center items-center w-screen">
        <div className="bg-purple-200 rounded-xl shadow-sm w-[40%]   h-[80%] ">
          <div className="flex justify-center items-center">
            <span className=""><h1>DoIt - Manage your Todo at one place</h1></span>
          </div>

          <div className="m-5 ">

            <h2>Add Todo</h2>
            <div className="flex gap-3 items-center ">
              <input type="text" className='bg-white rounded-2xl my-5 p-2 w-[90%] ' placeholder='enet' />
              <button className=' rounded-2xl bg-purple-400 px-4 py-1.5 flex-column justify-center items-center '>Save</button>
            </div>

            <div className="flex items-center">
              <div className='pr-2'>
                <svg {tick?`fill="#ffffff"`:""} onClick={tickhandle} className='bg-blue-400 rounded-sm  w-5 ' viewBox="0 0 1024.00 1024.00" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.01024" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="4.096"></g><g id="SVGRepo_iconCarrier"><path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z"></path></g></svg>
              </div>
              <div className=""> Show Finished</div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
