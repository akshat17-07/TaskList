import { memo, useState } from "react";
import useAddData from "../hooks/useAddData";

function AddTask() {
    const [task, setTask] = useState("Add new Task");
    const [completed, setCompleted] = useState(false);
    const { addData, loading, error, success } = useAddData("http://localhost:3000/task");

    function submitNewData(event) {
        event.preventDefault();
        const body = {
            name: task,
            completed: completed ? "true" : "false"
        };
        addData(body);
        setTask("")
        setCompleted(false)
    }

    return (
        <>
            <form>
                <label htmlFor="task">Task:</label>
                <input
                    id="task"
                    type="text"
                    value={task}
                    onChange={(event) => setTask(event.target.value)}
                />
                
                <label htmlFor="completed">Completed:</label>
                <input
                    id = 'completed'
                    type="checkbox"
                    checked={completed}
                    onChange={(event) => setCompleted(event.target.checked)}
                />

                <button onClick={submitNewData} disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>

            {error && <p>{error}</p>}
            {success != '' && <p>{success}</p>}
        </>
    );
}

export default memo(AddTask);
