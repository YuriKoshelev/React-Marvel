import {useState, useCallback} from 'react';


export const useHttp = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [condition, setCondition] = useState('waiting')
    //const [cond, setCond] = useState('waiting');

    //setCondition('fffffff')
    //console.log('88888' + condition)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        setLoading(true)

        try {
            const response = await fetch(url, {method, body, headers})
           
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);  
            }

            const data = await response.json()

            setLoading(false)
            return data

        } catch(e) {
            setLoading(false)
            setError(e.message)
            setCondition('error')
            throw e
        }

    }, [])

    const clearError = useCallback(() => {
        setError(null)
        setCondition("loading")
    }, [])

    return {loading, request, error, clearError, condition, setCondition}
}