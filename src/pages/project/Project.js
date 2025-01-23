import './Project.css'
import React from 'react'
import { useDocument } from '../../hooks/useDocuments'
import { useParams } from 'react-router-dom'
import ProjectSummary from './ProjectSummary'
import ProjectComments from './ProjectComments'

// Use the useDocument hook to get the document from the database, extract the document and id from the hook and pass them as props to the component. For that we need to import the useParams hook from react-router-dom and destructure the id from the params object

export default function Project({ showComments }) {

  const { id } = useParams()
  const { error, document } = useDocument('projects', id)

  return (

    <div className='project-details' style={{margin: '30px 0'}}>
      {/* Project details */}
        {error && <p className='error'>{error}</p>}
        {!document && !error && <p className='loading'>Loading...</p>}
        {document && (
          <React.Fragment>
          <ProjectSummary project={document} />
          <ProjectComments project={document} showComments={showComments} />
          </React.Fragment>
        )}
    </div>
  )
}
