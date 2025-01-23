import React from 'react'
import { useState } from 'react'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { v4 as uuidv4 } from 'uuid'
import { useFirestore } from '../../hooks/useFirestore'
import Avatar from '../../components/Avatar'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function ProjectComments({ project, showComments }) {

    const [comment, setComment] = useState('')
    const { user } = useAuthContext()
    const { updateDocument } = useFirestore('projects')
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: comment,
            createdAt: timestamp.fromDate(new Date()),
            id: uuidv4(),
            createdBy: user.uid
        }
        
        const updatedComments = project.comments ? [...project.comments, commentToAdd] : [commentToAdd]

        updateDocument(project.id, { comments: updatedComments })
        setComment('')
    }

    const handleDelete = async (id) => {
        const updatedComments = project.comments.filter(comment => comment.id !== id)

        updateDocument(project.id, { comments: updatedComments })
    }

  return (
    <div className='project-comments' style={{ display: showComments ? 'block' : 'none' }}>
        <h4>Project Comments</h4>
        <ul>
            {project.comments.length > 0 && project.comments.map(comment => (
            <li key={comment.id}>
                <div className='comment-author'>
                {user.uid === comment.createdBy && <button className="comment-delete" 
                onClick={() => handleDelete(comment.id)}
                >
                x</button>}
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
                </div>
                <div className='comment-date'>
                <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true})}</p>
                </div>
                <div className='comment-content'>
                <p>{comment.content}</p>
                </div>
            </li>
            ))}
        </ul>
        
        <form className='add-comment' onSubmit={handleSubmit}>
            <label>
            <span>Add new comment:</span>
            <textarea
            required
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            ></textarea>
            </label>
            <button className='btn' style={{marginTop: '20px'}}>Add Comment</button>
        </form>
      
    </div>
  )
}
