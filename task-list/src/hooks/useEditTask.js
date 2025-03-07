import {useState, useEffect} from 'react';


function useEditTask(id, url){
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        setLoading(true);

        const path = url + "/" + id
        
        fetch(path)
            .then(res => {
                if (!res.ok){
                    throw new Error("Error in getting id");
                }
                console.log(res) 
                return res.json()
            })
            .then(data => {
                setTask(data)
                setLoading(false)
            })
            .catch( err =>{
                setError(err.message);
                setLoading(false);
            })
            .finally( () => {
                setLoading(false)
            }
            )

    }, [url, id]);

    function updateTask(id, updatedTask) {
        setLoading(true);
        setError("");
        setSuccess("");

        const path = url + "/" + id

        fetch(path, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: updatedTask,
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error im updating task`);
            }
            return res.json();
        })
        .then((data) => {
            setSuccess(`Task updated successfully`);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => setLoading(false));
    }

    return {task, setTask, loading, error, success, updateTask};
}

export default useEditTask