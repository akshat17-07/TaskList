import {useEffect, useState} from 'react'

const useTasks = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState('');

    function deleteData(id) {
        setLoading(true);
        setError(null);
        setSuccess('');
        
        const path = url + '/' + id

        fetch(path, {
            method: "DELETE",
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`error in deleting data.`);
            }
            return res.json();
        })
        .then(() => {
            setSuccess(`data successfully deleted`);
            console.log(`data successfully deleted`);
             setData(prevData => prevData ? prevData.filter(item => item.id !== id) : []);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => setLoading(false));
    }


    useEffect(() => {
            setLoading(true)
            
            const path = url 

            fetch(path)
                .then(res => {
                    if (!res.ok){
                        throw Error("could not fetch the data.")
                    }
                    return res.json();
                })
                .then(res =>{
                        setData(res)
                        setLoading(false)
                        
                })
                .catch(err => {
                    setError(err.message)
                })
                
        }, [url]);

        

        return {data, loading, error, success, deleteData}
    }


export default useTasks;