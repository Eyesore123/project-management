import { useState } from 'react'
import { projectAuth, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { useEffect } from 'react'

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            // login
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            if (!res) {
                throw new Error('Could not complete login')
            }

            // dispatch login action

            dispatch({ type: 'LOGIN', payload: res.user })

            // Update online status

            await db.collection('users').doc(res.user.uid).update({ online: true})

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

    return { login, error, isPending }
}