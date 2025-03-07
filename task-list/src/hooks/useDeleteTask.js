import { useState } from "react";

function useDeleteData(url) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');

    function deleteData(id) {
        setLoading(true);
        setError(null);
        setSuccess(false);
        
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
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => setLoading(false));
    }

    return { deleteData, loading, error, success };
}

export default useDeleteData;
