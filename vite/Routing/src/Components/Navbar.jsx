import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>

        <Link  className='red'  to={"/About"}>  ab</Link>
        <Link  className='red' to={"/Contact"}>co  </Link>
        <Link className='red'  to={"/Login"}>  lo
        
        </Link>
=    </div>
  )
}

export default Navbar
