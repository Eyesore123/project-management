import { db } from '../firebase/config'
import { useEffect, useState } from 'react'

export const useDocument = ( collection, id ) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // realtime listener, get realtime updates from firestore (comments also). used where we need to get a single document from firestore. it takes a collection and a document id as arguments.

    useEffect(() => {

        const ref = db.collection(collection).doc(id)
        const unsubscribe = ref.onSnapshot((doc) => {
            if (doc.exists) {
                setDocument({...doc.data(), id: doc.id})
                setError(null)
            } else {
                setError('No such document exists')
            }
        }, (err) => {
            console.log(err.message)
            setError('Failed to get document')
        })

        return () => unsubscribe()

    }, [collection, id])

    return { document, error }
}
