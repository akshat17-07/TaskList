import { useState } from "react";

function useAddData(url) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('')

    function addData(body) {
        setLoading(true);
        setError(null);

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Error in adding data");
            }
            return res.json();
        })
        .then(() => setSuccess("Data Added to the server"))
        .catch((error) => {
            console.log(error);
            setError(error.message);
        })
        .finally(() => setLoading(false));
    }

    return { addData, loading, error, success};
}

export default useAddData;
