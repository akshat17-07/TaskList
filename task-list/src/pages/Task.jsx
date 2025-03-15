import {memo} from 'react'
import { Link } from 'react-router-dom'
import {clsx} from 'clsx'
import { ThemeContext } from '../App'
import { useContext } from 'react'
import useEditTask from '../hooks/useEditTask'

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
                <span className="ml-auto">{d.completed? 'Completed' : 'To Do'}</span>
                <Link to={`edit/${d.id}`} className="ml-4">
                    <button className="bg-green-500 text-white px-3 py-1 rounded">Edit</button>
                </Link>
                <button 
                    onClick={(event) => taskDelete(event, d.id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                >
                    Delete
                </button>
            </div>
        )
}

export default memo(Task)