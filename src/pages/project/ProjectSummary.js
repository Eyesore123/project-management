import React from 'react'
import './Project.css'
import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function ProjectSummary( { project }) {

  const { user } = useAuthContext()

  const { deleteDocument } = useFirestore('projects')
  // Delete project function, delete only if user is the owner of the project
  const handleClick = (e) => {

    if(project.createdBy.id === user.uid) {
      deleteDocument(project.id)
      // Navigate to home page
      window.location.href = '/'
    }
  }
  

  return (
    <div>
        <div className='project-summary'>
        <h2 className='page-title'>{project.name}</h2>
        <p>Created by: {project.createdBy.displayName}</p>
        <p className='due-date'>
            Due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className='details'>{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className='assigned-users'>
        {project.assignedUsersList.map(user => (
                <div key={user.photoURL}>
                    <Avatar src={user.photoURL} />
                </div>
            ))}
            </div>
        </div>
        {project.createdBy.id === user.uid && <button className='btn' onClick={handleClick}>Mark As Complete</button>}
    </div>

  )
}
