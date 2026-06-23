import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='bg-purple-500 flex gap-4 h-9 ' >
      <NavLink className= { ({isActive})=>`${isActive?"bg-red-500":""}  text-white hover:text-gray-200 `} to='/about'>About</NavLink>
      <NavLink className= { ({isActive})=>`${isActive?"bg-red-500":""}  text-white hover:text-gray-200 `} to='/contact'>Contact</NavLink>
      <NavLink className= { ({isActive})=>`${isActive?"bg-red-500":""}  text-white hover:text-gray-200 `}    to='/login'>Login</NavLink>
    </div>
  )
}

export default Navbar
