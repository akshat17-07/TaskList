import { memo, useState, useContext } from "react";
import useAddData from "../hooks/useAddData";
import { ThemeContext } from "../App";
import { clsx } from "clsx";

function AddTask() {
    const [task, setTask] = useState("Add new Task");
    const [completed, setCompleted] = useState(false);
    const { addData, loading, error, success } = useAddData("http://localhost:3000/task");

    const { theme } = useContext(ThemeContext);

    function submitNewData(event) {
        event.preventDefault();
        const body = {
            name: task,
            completed: completed ? true : false
        };
        addData(body);
    }

    const formContainerClass = clsx(
        "max-w-lg mx-auto md:mt-10 md:p-6 p-2 sm:p-4 rounded-lg shadow-md",
        {
            "bg-gray-100 text-gray-900": theme === "light",
            "bg-gray-800 text-white": theme !== "light"
        }
    );

    const inputClass = clsx(
        "w-full md:p-2 md:mt-2 p-1 mt-1 border rounded-md focus:outline-none",
        {
            "border-gray-300 bg-white text-gray-900 focus:border-blue-500": theme === "light",
            "border-gray-600 bg-gray-700 text-white focus:border-blue-400": theme !== "light"
        }
    );

    const buttonClass = clsx(
        "w-full md:px-4 md:py-2 md:mt-4 px-2 py-1 mt-2 font-semibold text-white rounded-md transition-all duration-200",
        {
            "bg-blue-500 hover:bg-blue-600": theme === "light",
            "bg-blue-700 hover:bg-blue-800": theme !== "light"
        }
    );

    return (
        <div className={formContainerClass}>
            <h2 className="md:text-xl font-semibold text-center">Add New Task</h2>
            <form onSubmit={submitNewData} className="md:mt-4 mt-2">
                
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
                
                <div className="flex mt-1 items-center md:mt-3">
                    <input
                        id="completed"
                        type="checkbox"
                        checked={completed}
                        onChange={(event) => setCompleted(event.target.checked)}
                        className="md:w-4 w-2 md:h-4 h-2 text-blue-500 focus:ring focus:ring-blue-300"
                    />
                    <label htmlFor="completed" className="md:ml-2 ml-1 text-sm font-medium">
                        Mark as Completed
                    </label>
                </div>

                <button type="submit" disabled={loading} className={buttonClass}>
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>

            {error && <p className="md:mt-2 mt-1 text-red-500">{error}</p>}
            {success && <p className="md:mt-2 mt-1 text-green-500">{success}</p>}
        </div>
    );
}

export default memo(AddTask);
