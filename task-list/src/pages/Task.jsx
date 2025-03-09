import {memo} from 'react'
import { Link } from 'react-router-dom'
import {clsx} from 'clsx'

function Task({key, d, taskDelete}){

    return (
        <>
            {d.name} <br/>
            {d.completed.toString()} 
            <Link to={`edit/${d.id}`}>
                <button>Edit</button>
            </Link>
            <button onClick={(event) => taskDelete(event, d.id)}>Delete</button>
        </>)
}

export default memo(Task)