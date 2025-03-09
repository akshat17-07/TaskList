import { memo, useState, useContext } from "react";
import useAddData from "../hooks/useAddData";
import { ThemeContext } from "../App";
import { clsx } from "clsx";

function AddTask() {
    const [task, setTask] = useState("Add new Task");
    const [completed, setCompleted] = useState(false);
    const { addData, loading, error, success } = useAddData("http://localhost:3000/task");
    const [count, setCount] = useState(10);

    const { theme } = useContext(ThemeContext);

    function submitNewData(event) {
        event.preventDefault();
        const body = {
            name: task,
            completed: completed ? "true" : "false"
        };
        setCount(prevCount => prevCount + 1);
        addData(body);
        setTask(`Task: ${count}`);
        setCompleted(() => count % 1 === 0);
    }

    const formContainerClass = clsx(
        "max-w-lg mx-auto mt-10 p-6 rounded-lg shadow-md",
        {
            "bg-gray-100 text-gray-900": theme === "light",
            "bg-gray-800 text-white": theme !== "light"
        }
    );

    const inputClass = clsx(
        "w-full p-2 mt-2 border rounded-md focus:outline-none",
        {
            "border-gray-300 bg-white text-gray-900 focus:border-blue-500": theme === "light",
            "border-gray-600 bg-gray-700 text-white focus:border-blue-400": theme !== "light"
        }
    );

    const buttonClass = clsx(
        "w-full px-4 py-2 mt-4 font-semibold text-white rounded-md transition-all duration-200",
        {
            "bg-blue-500 hover:bg-blue-600": theme === "light",
            "bg-blue-700 hover:bg-blue-800": theme !== "light"
        }
    );

    return (
        <div className={formContainerClass}>
            <h2 className="text-xl font-semibold text-center">Add New Task</h2>
            <form onSubmit={submitNewData} className="mt-4">
                
                {/* Task Input */}
                <label htmlFor="task" className="block font-medium">
                    Task:
                </label>
                <input
                    id="task"
                    type="text"
                    value={task}
                    onChange={(event) => setTask(event.target.value)}
                    className={inputClass}
                />
                
                <div className="flex items-center mt-3">
                    <input
                        id="completed"
                        type="checkbox"
                        checked={completed}
                        onChange={(event) => setCompleted(event.target.checked)}
                        className="w-4 h-4 text-blue-500 focus:ring focus:ring-blue-300"
                    />
                    <label htmlFor="completed" className="ml-2 text-sm font-medium">
                        Mark as Completed
                    </label>
                </div>

                <button type="submit" disabled={loading} className={buttonClass}>
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>

            {error && <p className="mt-2 text-red-500">{error}</p>}
            {success && <p className="mt-2 text-green-500">{success}</p>}
        </div>
    );
}

export default memo(AddTask);
