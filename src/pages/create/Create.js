import './Create.css'
import { useState } from 'react'
import React from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { db } from '../../firebase/config'
import firebase from 'firebase/app';
import 'firebase/firestore';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' }
]

export default function Create() {

  // Form field values:

  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)
  const { documents } = useCollection('users')
  const { user } = useAuthContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError(null)
    
    // Validation:
    if(!category) {
      setFormError('Please select a category')
      return
    } 
    
    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least one user')
      return
    }

    // Add project creator constant to store creator details

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    // Map through assigned users and create an object for each user

    const assignedUsersList = assignedUsers.map(u => {
      return {
        displayName: u.displayName,
        photoURL: u.photoURL,
        id: u.id
      }
    })

    // Add project to firebase with these project details (project collection) and redirect to home page once created and no error

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
      created_at: firebase.firestore.Timestamp.now()
    }

    db.collection('projects').add(project)

    .then(() => {
      // Clear form fields, but its unnecessary when redirects to home page
      setName('')
      setDetails('')
      setDueDate('')
      setFormError(null)

      window.location.href = '/'
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div className='create-form'>
      <h2 className='page-title'>
        Create a new project
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            type="text"
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Due date:</span>
          <input
            type="date"
            required
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
            <span>Project category:</span>
            {/* Import Select component from react-select and 
            then add props to it. Use the options prop to pass in the categories array. */}
            <Select
              onChange={(selectedOption) => setCategory(selectedOption)}
              options={categories}
            />
        </label>
        <label>
            <span>Assigned to:</span>
            <Select 
            onChange={(option) => setAssignedUsers(option)}
              options={documents}
              isMulti={true}
              getOptionLabel={(option) => option.displayName}
              getOptionValue={(option) => option.id}
            />
        </label>

        <button className='btn'>Add project</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}
