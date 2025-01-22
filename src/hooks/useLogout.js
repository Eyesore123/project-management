import { useState } from 'react'
import { projectAuth, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { useEffect } from 'react'

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign out user

        try {
            // Update online status before sign out

            const currentUser = projectAuth.currentUser

            if (currentUser?.uid) {
                await db.collection('users').doc(currentUser.uid).update({
                     online: false,
                    lastSeen: new Date()
                })
            }

            // dispatch logout action

            dispatch({ type: 'LOGOUT'})

            // update state

            if (!isCancelled) {
            setError(null)
            }
        }

        catch (err) {
            if (!isCancelled) {
            console.log(err.message)
            setError(err.message)
            }
        }

        finally {
            if (!isCancelled) {
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        setIsCancelled(false)
        return () => setIsCancelled(true)
    }, [])

    return { logout, error, isPending }
}