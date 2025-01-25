import React, { useState, useEffect } from 'react';
import './Create.css';
import Select from 'react-select';
import { db } from '../../firebase/config';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' }
];

export default function Update() {
  // Form field values:
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState(null);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { id } = useParams();
  const [createdBy, setCreatedBy] = useState('');
  const [dueDate, setdueDate] = useState('');
  const [comments, setComments] = useState([]);

// const assignedUsersWithDetails = await Promise.all(
    //   assignedUsers.map(async (user) => {
    //     const userDoc = await db.collection('users').doc(user.id).get();
    //     const userData = userDoc.data();
    //     return {
    //       displayName: userData.displayName,
    //       id:
    //     };
    //   })
    // );

  // Add Document function with custom ID
  const addDocument = async (doc, customId = null) => {
    try {
      const createdAt = new Date();
      const addedDocument = customId
        ? await db.collection('projects').doc(customId).set({ ...doc, createdAt })
        : await db.collection('projects').add({ ...doc, createdAt });
      return addedDocument;
    } catch (err) {
      console.error('Error adding document: ', err);
      throw new Error(`Could not add the document: ${err.message}`);
    }
  };
  
  // Delete Document function
  const deleteDocument = async (id) => {
    try {
      await db.collection('projects').doc(id).delete();
    } catch (err) {
      console.error('Error deleting document: ', err.message);
      throw new Error('Could not delete the document');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    
    // Validation:
    if (!name) {
      setFormError('Project name is required.');
      setIsPending(false);
      return;
    }
  
    if (!details) {
      setFormError('Project details are required.');
      setIsPending(false);
      return;
    }
  
    if (!category) {
      setFormError('Please select a category.');
      setIsPending(false);
      return;
    }
  
    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least one user.');
      setIsPending(false);
      return;
    }
  
    const updatedProject = {
      name,
      details,
      category: category.value,
  assignedUsersList: assignedUsers
    .filter((user) => user.value)  // Filter out users with undefined `value`
    .map((user) => ({
      displayName: user.label,
      id: user.value, // ID from the user's `value` field
      photoURL: user.photoURL
    })),
    createdBy,
    dueDate: firebase.firestore.Timestamp.fromDate(new Date(dueDate)),
    comments
};

      // Log the object to debug
  console.log('Updated Project:', updatedProject);

    try {
      // Step 1: Delete the old project document
      await deleteDocument(id)
      console.log('Old document deleted successfully');
  
      // Step 2: Add the new project with the same ID
      await addDocument(updatedProject, id)
      console.log('New document added successfully');
  
      // Redirect or show success message after successful update
      window.location.href = '/'
    } catch (error) {
      setFormError('Could not update the project.')
      console.error('Error updating project:', error);
    } finally {
      setIsPending(false)
    }
  };

  // Fetch the project data and prefill the form fields
  useEffect(() => {
    const fetchProject = async () => {
      const doc = await db.collection('projects').doc(id).get();
      if (doc.exists) {
        const projectData = doc.data();
        setComments(projectData.comments);
        console.log(projectData); // Add this for debugging
        // Convert Firestore timestamp to date string

        setName(projectData.name);
        setDetails(projectData.details);
        setCategory(categories.find((c) => c.value === projectData.category));
        setAssignedUsers(
          projectData.assignedUsersList.map((user) => ({
            value: user.id,
            label: user.displayName,
            photoURL: user.photoURL,

          }))
        );
        setCreatedBy(projectData.createdBy);
        setdueDate(projectData.dueDate);
      }
    };
    fetchProject();
  }, [id]);

  // Fetch all users from the 'users' collection and set them as available users
  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await db.collection('users').get();
      const usersList = usersSnapshot.docs.map((doc) => {
        const userData = doc.data();
        return {
          value: userData.uid,
          label: userData.displayName,
          displayName: userData.displayName
        };
      });
      setAvailableUsers(usersList);
    };
    fetchUsers();
  }, []);

  return (
    <div className="update-project create-form">
      <form onSubmit={handleSubmit}>
        <h2 className="page-title">Update Project</h2>
        <label>
          <span>Project name:</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            required
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>
        <label>
          <span>Project Category:</span>
          <Select
            options={categories}
            value={category}
            onChange={(selectedOption) => setCategory(selectedOption)}
          />
        </label>
        <label>
          <span>Assigned to:</span>
          <Select
            options={availableUsers}
            isMulti={true}
            value={assignedUsers}
            onChange={(selectedOption) => setAssignedUsers(selectedOption)}
          />
        </label>
        <label>
          <span>Project Due Date:</span>
          <input
            type="date"
            value={dueDate || setdueDate(new Date())}
            onChange={(e) => {
              console.log('New date selected:', e.target.value);
              console.log(typeof(dueDate));
             setdueDate(e.target.value)}
            }
          />
        </label>

        {!isPending && <button className="btn">Update Project</button>}
        {isPending && <button className="btn" disabled>Updating...</button>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
