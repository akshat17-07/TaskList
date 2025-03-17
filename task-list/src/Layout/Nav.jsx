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

    const navClass = clsx("m-0 p-1 sm:p-3 md:p-5 flex items-center justify-between", {
        "bg-gray-900": theme !== "light",
        "bg-gray-200": theme === "light",
    });

    const navLinkClass = clsx("md:text-2xl sm:text-lg text-md font-bold", {
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
                            className="md:px-3 md:py-1 border rounded"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <select
                            className="md:px-3 md:py-1 md:mr-5 px-0 py-0 border rounded mr-3"
                            value={completedInput}
                            onChange={(e) => setCompletedInput(Number(e.target.value))}
                        >
                            <option value={0}>All</option>
                            <option value={1}>Completed</option>
                            <option value={2}>To Do</option>
                        </select>
                        <button type="submit" className="md:px-5 md:py-3 md:ml-5 border rounded bg-green-400">
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
