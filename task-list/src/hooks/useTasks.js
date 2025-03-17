import { useEffect, useState } from "react";

const useTasks = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState("");
    const [filterData, setFilterData] = useState(null);

    function deleteData(id) {
        setLoading(true);
        setError(null);
        setSuccess("");

        const path = url + "/" + id;

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
                setData((prevData) =>
                    prevData ? prevData.filter((item) => item.id !== id) : []
                );
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }

    function handleFilterData(name = "", completed = 0) {
        if (!data) return;

        setLoading(true);

        const filteredData = data.filter((task) => {
            const matchesCompleted =
                completed === 0 ||
                (completed === 1 && task.completed) ||
                (completed === 2 && !task.completed);
            
            const matchesName =
                name === '' || task.name.toLowerCase().includes(name.toLowerCase());

            return matchesCompleted && matchesName;
        });

        setFilterData(filteredData);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);

        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw Error("Could not fetch the data.");
                }
                return res.json();
            })
            .then((res) => {
                setData(res);
                setFilterData(res); // Initialize filtered data with full data
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [url]);

    return { data, filterData, loading, error, success, deleteData, handleFilterData };
};

export default useTasks;
