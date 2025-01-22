import { db } from "../firebase/config"
import { useEffect, useState, useRef } from "react"

export const useCollection = (collection, _orderBy, _query) => {

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    const orderBy = useRef(_orderBy).current
    const query = useRef(_query).current

    useEffect(() => {

        let ref = db.collection(collection)

        if (query) {
            ref = ref.where(...query)
        }

        if (orderBy) {
            ref = ref.orderBy(...orderBy)
        }

        // Real time event listener to the collection:

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = []

            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })
            
            // Update state

            setDocuments(results)
            setError(null)
        }, (err) => {
            console.log(err)
            setError('Could not fetch the data')
        })

        // Unsubscribe on unmount

        return () => unsubscribe()

    }, [collection, orderBy, query])

    return { documents, error }

}