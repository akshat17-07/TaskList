import { useState, useEffect, useCallback } from "react";

function useEditTask(id, url) {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        setLoading(true);
        const path = url + "/" + id;

        fetch(path)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error in getting id");
                }
                return res.json();
            })
            .then((data) => {
                setTask(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [url, id]);

    const updateTask = useCallback((updatedTask) => {
        setLoading(true);
        setError("");
        setSuccess("");

        const path = url + "/" + id;

        fetch(path, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error in updating task`);
                }
                return res.json();
            })
            .then(() => {
                setSuccess(`Task updated successfully`);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }, [id, url]);

    const flipTask = useCallback(() => {
        setTask((prev) => {

            const updatedTask = { ...prev, completed: !prev.completed };
            updateTask(updatedTask);
            return updatedTask;
        });
    }, [updateTask]);

    return { task, setTask, loading, error, success, updateTask, flipTask };
}

export default useEditTask;
