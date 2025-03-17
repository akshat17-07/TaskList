import { memo, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import { ThemeContext } from "../App";
import Button from "./Button";
import useFilterTask from "../hooks/useFilterTask";
import { FaFilter } from "react-icons/fa";

function Nav() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const navClass = clsx("m-0 p-1 sm:p-3 md:p-5 flex items-center justify-between", {
        "bg-gray-900": theme !== "light",
        "bg-gray-200": theme === "light",
    });

    const navLinkClass = clsx("md:text-2xl sm:text-lg text-md font-bold", {
        "text-gray-800": theme === "light",
        "text-gray-200": theme !== "light",
    });

    console.log("Nav bar rerender");

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

            <Button />
        </nav>
    );
}

export default memo(Nav);
