import {memo} from 'react'
import { Link } from 'react-router-dom'
import {clsx} from 'clsx'
import { ThemeContext } from '../App'
import { useContext } from 'react'
import useEditTask from '../hooks/useEditTask'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { RiStickyNote2Fill } from "react-icons/ri";


function Task({key, d, taskDelete}){

    const {theme} = useContext(ThemeContext)

    const continerClass = clsx(
        {
            "flex items-center justify-between mt-5 p-1": true,
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
                    <div className='bg-green-500 text-white px-3 py-2  rounded'>
                        <TiTick/>
                    </div> : 
                    <div className="bg-red-500 text-white px-3 py-2 rounded ml-2">
                        <RiStickyNote2Fill/>
                    </div>
                    }</span>
                
                <Link to={`edit/${d.id}`} className="ml-4">
                    <button className="bg-green-700 text-white px-3 py-2  rounded"><FaEdit/></button>
                </Link>
                <button 
                    onClick={(event) => taskDelete(event, d.id)} 
                    className="bg-red-700 text-white px-3 py-2 rounded ml-2"
                >
                    <MdDelete/>
                </button>
            </div>
        )
}

export default memo(Task)