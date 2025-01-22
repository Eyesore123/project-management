import './ProjectList.css'
import { Link } from 'react-router-dom'
import React from 'react'
import Avatar from './Avatar'

export default function ProjectList({ projects }) {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet</p>}
      {projects.map((doc) => (
        <Link to={`/projects/${doc.id}`} key={doc.id}>
            <h4>{doc.name}</h4>
            <p>Due by {doc.dueDate.toDate().toDateString()}</p>
            <div className='assigned-to'>
            <ul>
                {doc.assignedUsersList.map(user => (
                    <li key={user.photoURL}>
                        <Avatar src={user.photoURL} />
                    </li>
                ))}
            </ul>
            </div>
        </Link>
      ))}
    </div>
  )
}
