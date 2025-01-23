import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import React from 'react'
import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'
import CogButton from './cogButton'

export default function Sidebar({ setShowComments}) {

    const { user } = useAuthContext()

  return (
    <div className='sidebar'>
        <div className="sidebar-content">
            <div className='user'>
                <Avatar src={user.photoURL} />
                <p>Hey {user.displayName}</p>
            </div>
            <nav className="links">
                <ul>
                    <li>
                        <NavLink exact to="/">
                            <img src={DashboardIcon} alt="dashboard icon" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/create">
                            <img src={AddIcon} alt="add icon" />
                            <span>New Project</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            {/* Cog button here */}
            <CogButton setShowComments={setShowComments}
             />
        </div>
      
    </div>
  )
}
