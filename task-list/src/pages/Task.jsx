import {memo} from 'react'
import { Link } from 'react-router-dom'
import {clsx} from 'clsx'
import { ThemeContext } from '../App'
import { useContext, useState } from 'react'
import useEditTask from '../hooks/useEditTask'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { RiStickyNote2Fill } from "react-icons/ri";


function Task({key, d, taskDelete}){

    const {theme} = useContext(ThemeContext)


    const continerClass = clsx(
        {
            "flex items-center justify-between sm:mt-2 md:mt-5 mt-1 sm:p-0 p-1": true,
            'bg-gray-700': theme != 'light',
            'bg-white': theme === 'light'
        }
    )

        const {flipTask} = useEditTask(d.id, "http://localhost:3000/task")


    return (
            <div className={continerClass} onClick={flipTask}>

                <span className="flex-1">{d.name}</span>
                <span className="ml-auto">
                    {d.completed? 
                    <div className='bg-green-500 sm:px-3 sm:py-2 md:px-3  text-white px-1 py-1  rounded'>
                        <TiTick/>
                    </div> : 
                    <div className="bg-red-500 text-white sm:px-3 sm:py-2 md:px-3  text-white px-1 py-1">
                        <RiStickyNote2Fill/>
                    </div>
                    }</span>
                
                <Link to={`add/${d.id}`} className="ml-4">
                    <button className="bg-green-700 text-white sm:px-3 sm:py-2 md:px-3  text-white px-1 py-1 mr-3 rounded"><FaEdit/></button>
                </Link>
                <button 
                    onClick={(event) => taskDelete(event, d.id)} 
                    className="bg-red-700 text-white sm:px-3 sm:py-2 md:px-3  text-white px-1 py-1"
                >
                    <MdDelete/>
                </button>
            </div>
        )
}

export default memo(Task)