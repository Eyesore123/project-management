import './Login.css'
import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import React from 'react'
import firebase from 'firebase/app';

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()
  const [showResetForm, setShowResetForm] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetError, setResetError] = useState(null)
  const [resetSuccess, setResetSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    //Check for errors here
  }

  const handleResetSubmit = async (e) => {
    e.preventDefault()
    setResetError('')
    setResetSuccess(false)

    // Handle reset password logic here

    if (!resetEmail || !resetEmail.includes('@')) {
      setResetError('Please enter a valid email address.')
      return
    }
 
    try {
      await firebase.auth().sendPasswordResetEmail(resetEmail)
      setResetSuccess('Password reset email sent successfully. Please check your inbox and refresh this page to log in.')
      setResetEmail('')
    } catch (error) {
      setResetError('Error sending password reset email: ' + error.message)
    }
  }

  return (
    <>
    {!showResetForm ? ( 
      <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      {!isPending && <button className="btn">Login</button>}
      {isPending && <button className="btn" disabled>Loading...</button>}
      {error && <div className='error'>{error}</div>}
    </form>
    ) : (

      <form className="auth-form" id="resetForm" onSubmit={handleResetSubmit}>
          <h2>Reset Password</h2>
          <label>
            <span>Email:</span>
            <input
              type="email"
              required
              onChange={(e) => setResetEmail(e.target.value)}
              value={resetEmail}
            />
          </label>

          <button className="btn">Send Reset Link</button>

          {resetError && <div className="error">{resetError}</div>}
          {resetSuccess && <div className="success">{resetSuccess}</div>}
        </form>
      )}

    <p className='auth-form'>
        <div className='logintext'>Don't have an account yet?</div>
        <button className='btn signup-btn'><a href="/signup" style={{textDecoration: 'none', color: 'var(--primary-color)'}}>Sign up</a></button>
        <div className='logintext'>
          Forgot your password? {' '}
        </div>
        <button 
            type="button" 
            className="btn reset-btn" 
            onClick={() => setShowResetForm(!showResetForm)}
          >
            Reset Password
          </button>
      </p>
    </>
  )
}
