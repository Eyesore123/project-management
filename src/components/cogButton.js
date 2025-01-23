import './Sidebar'
import './SettingsModal.css'
import '../pages/project/Project.css'
import CogIcon from '../assets/cog.png'
import React from 'react'
import { useState } from 'react'

export default function CogButton({ setShowComments }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const changeTheme = (theme) => {
        document.body.className = ""
        if (theme === 'default') {
            document.body.className = "violet-theme"
        } else if (theme === 'blue') {
            document.body.className = "blue-theme"
        } else if (theme === 'orange') {
            document.body.className = "orange-theme"
        }
    }

    const handleClick = () => {
        setIsModalOpen(true)
        setShowComments(false)
      }
    
      const handleClose = () => {
        setIsModalOpen(false)
        setShowComments(true)
      }

  return (
    <div>
        <button className='cog-button' onClick={handleClick}>
            <img src={CogIcon} alt="cog icon" className='cog' style={{ backgroundColor: 'none'}} /> 
        <span className='settings'>
            Settings
        </span>
        </button>

        <div className='modal-backdrop' style={{ display: isModalOpen ? 'block' : 'none' }}>
            {isModalOpen && <div className='settings-modal'>
                <h3>Select theme:</h3>
                <button style={{ backgroundColor: '#7b2cbf' }} onClick={() => changeTheme('default')}>Violet</button>
                <button style={{ backgroundColor: '#5ca4e4' }} onClick={() => changeTheme('blue')}>Light Blue</button>
                <button style={{ backgroundColor: '#ff784f' }} onClick={() => changeTheme('orange')}>Orange</button>
                
                <button className='comment-delete' style={{ padding: '16px 10px 20px 10px', fontSize: '2em'}} onClick={handleClose}>x</button>
            </div>
            }
        </div>
    </div>
  )
}
