import { memo, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import { ThemeContext } from "../App";
import Button from "./Button";
import useFilterTask from "../hooks/useFilterTask";
import { FaFilter } from "react-icons/fa";

function Nav() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const location = useLocation();
    const { filter} = useFilterTask();

    const [searchInput, setSearchInput] = useState("");
    const [completedInput, setCompletedInput] = useState(0); // 0 = all, 1 = completed, 2 = to do

    const navClass = clsx("m-0 p-5 flex items-center justify-between", {
        "bg-gray-900": theme !== "light",
        "bg-gray-200": theme === "light",
    });

    const navLinkClass = clsx("text-2xl font-bold", {
        "text-gray-800": theme === "light",
        "text-gray-200": theme !== "light",
    });

    console.log("Nav bar rerender");

    const handleSubmit = (event) => {
        event.preventDefault()
        filter(searchInput, completedInput)
    };

    return (
        <nav className={navClass}>
            <div className="flex gap-5">
                <Link to="/" className={navLinkClass}>
                    Home
                </Link>
                <Link to="/add" className={navLinkClass}>
                    Add Task
                </Link>
            </div>

            {location.pathname === "/" && (
                <div className="flex gap-3">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="px-3 py-1 border rounded"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <select
                            className="px-3 py-1 mr-5 border rounded"
                            value={completedInput}
                            onChange={(e) => setCompletedInput(Number(e.target.value))}
                        >
                            <option value={0}>All</option>
                            <option value={1}>Completed</option>
                            <option value={2}>To Do</option>
                        </select>
                        <button type="submit" className="px-5 py-3 ml-5 border rounded bg-green-400">
                            <FaFilter />
                        </button>
                    </form>
                </div>
            )}

            <Button />
        </nav>
    );
}

export default memo(Nav);
