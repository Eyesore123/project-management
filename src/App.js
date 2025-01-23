import './App.css'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Create from './pages/create/Create'
import Project from './pages/project/Project'
import Dashboard from './pages/dashboard/Dashboard'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useAuthContext } from './hooks/useAuthContext'
import OnlineUsers from './components/OnlineUsers'

import { useState } from 'react'

// For useEffect
import { db } from './firebase/config'
import { projectAuth } from './firebase/config'
import { useEffect } from 'react'
import 'firebase/auth'

function App() {

  const { authIsReady, user, dispatch } = useAuthContext()
  const [showComments, setShowComments] = useState(true)

  useEffect(() => {
    const unsubscribe = projectAuth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        await db.collection('users').doc(currentUser.uid).set({ 
          online: true,
          lastSeen: new Date() 
        }, { merge: true })
      } else {
        if (user?.uid) {
          await db.collection('users').doc(user.uid).update({ 
            online: false,
            lastSeen: new Date()
          })
        }
        dispatch({ type: 'LOGOUT' })
      }
    })

    const handleWindowClose = async () => {
      if (user?.uid) {
        await db.collection('users').doc(user.uid).update({ 
          online: false,
          lastSeen: new Date() 
        })
      }
    }

    window.addEventListener('beforeunload', handleWindowClose)

    return () => {
      unsubscribe()
      window.removeEventListener('beforeunload', handleWindowClose)
    }
  }, [user, dispatch])

  return (
    <div className="App">
    { authIsReady && (
      <BrowserRouter>
      {user && <Sidebar setShowComments={setShowComments} />}
        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path="/">
              {user && <Dashboard />}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route path="/create">
              {user && <Create />}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route path="/projects/:id">
              {user && <Project showComments={showComments} />}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>
            <Route path="/signup">
              {user && <Redirect to="/" />}
              {!user && <Signup />}
            </Route>
          </Switch>
        </div>
        {user && <OnlineUsers /> }
      </BrowserRouter>
      )}
    </div>
  );
}

export default App