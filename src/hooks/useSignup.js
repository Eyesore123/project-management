import { useState } from 'react'
import { projectAuth, projectStorage } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { useEffect } from 'react'
import { db } from '../firebase/config'

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)

        try {
            // signup
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            //Check for errors here

            if (!res) {
                throw new Error('Could not complete signup')
            }

            // Upload user thumbnail by creating an upload path, like a folder structure
            // We create the path and then put the file in the storage bucket

            const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
            const img = await projectStorage.ref(uploadPath).put(thumbnail)

            // Get the download URL
            const imageURL = await img.ref.getDownloadURL()

            // add display name to the user, also add photoURL property so we can use it in the UI and use the imageURL

            await res.user.updateProfile({ displayName, photoURL: imageURL })

            // Create a user document for every user

            await db.collection('users').doc(res.user.uid).set(
                {   online: true,
                    displayName, 
                    photoURL: imageURL }
            )

            // dispatch login action

            dispatch({ type: 'LOGIN', payload: res.user })

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
        //Check if the component mounted
        return () => {
            setIsCancelled(true)
            //Check if the component unmounted
        }
    }, [])

    return { signup, error, isPending }
}