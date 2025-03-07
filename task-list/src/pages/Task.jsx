import {memo} from 'react'

function Task({d}){
    return (
        <li key={d.id}>
            {d.name} <br/>
            {d.completed.toString()} 
            <Link to={`edit/${d.id}`}>
                <button>Edit</button>
            </Link>
            <button onClick={(event) => taskDelete(event, d.id)}>Delete</button>
        </li>)
}

export default memo(Task)