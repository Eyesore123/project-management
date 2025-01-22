import './Navbar.css'
import Temple from '../assets/temple.svg'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

import React from 'react'

export default function Navbar() {

    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()

  return (
    <div className='navbar'>
        <ul>
            <li className='logo'>
                <img src={Temple} alt="dojo logo" />
                <span>The Dojo</span>
            </li>

            {!user && <li>
                <Link to="/Login">Login</Link>
            </li>}
            {!user && <li>
                <Link to="/Signup">Signup</Link>
            </li>}

            {!isPending && user && <button className='btn' onClick={logout}>Logout</button>}
            {isPending && user && <button className='btn' disabled>Logging out...</button>}

        </ul>
    </div>
  )
}
