import './Dashboard.css'
import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'
import  { useState } from 'react'
import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function Dashboard() {

  const { documents, error } = useCollection('projects')
  const [currentFilter, setCurrentFilter] = useState('all')
  const { user } = useAuthContext()

  // changeFilter takes the new filter value and sets it to the current filter (buttonClick changes class values -> handleClick starts changeFilter -> changeFilter sets the new filter value and sets it to the current filter, which is then passed to ProjectFilter component). Be default, the current filter is set to 'all' and so ProjectFilter will display all projects. Rendering of the projects happens in ProjectList component so we need to pass the documents to ProjectList as a prop.

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
}

    // Filtering the projects based on the selected filter
    const filteredProjects = documents ? documents.filter((document) => {
      switch (currentFilter) {
        case 'all':
          return true
        case 'mine':
          return document.assignedUsersList.some(u => u.id === user.uid)
        case 'development':
        case 'design':
        case 'marketing':
        case 'sales':
          return document.category === currentFilter
        default:
          return true
      }
    }) : []

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && documents.length > 0 && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
      {documents && <ProjectList projects={filteredProjects} />}
    </div>
  )
}
