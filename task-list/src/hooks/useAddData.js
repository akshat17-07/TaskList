import { useState, useEffect } from "react";

function useAddData(url) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');

    function addData(body, id = null) {
        setLoading(true);
        setError(null);

        fetch(id ? `${url}/${id}` : url, {
            method: id ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(id ? "Error in updating data" : "Error in adding data");
            }
            return res.json();
        })
        .then(() => setSuccess(id ? "Data Updated on the server" : "Data Added to the server"))
        .catch((error) => {
            console.log(error);
            setError(error.message);
        })
        .finally(() => setLoading(false));
    }

    function fetchTask(id) {
        return fetch(`${url}/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error in fetching task data");
                }
                return res.json();
            })
            .catch((error) => {
                console.log(error);
                setError(error.message);
                return null;
            });
    }

    return { addData, fetchTask, loading, error, success };
}

export default useAddData;
