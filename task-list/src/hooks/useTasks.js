import {useEffect, useState} from 'react'

const useTasks = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
            setLoading(true)
            
            fetch(url)
                .then(res => {
                    if (!res.ok){
                        throw Error("could not fetch the data.")
                    }
                    return res.json();
                })
                .then(res =>{
                        console.log(res)
                        setData(res)
                        setLoading(false)
                })
                .catch(err => {
                    setError(err.message)
                })
        }, [url]);

        return {data, loading, error}
    }


export default useTasks;