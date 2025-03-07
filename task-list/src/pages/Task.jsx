import {memo} from 'react'
import useTasks from '../hooks/useTasks';
import { Link } from 'react-router-dom';

function Task(){

    const {data, loading, error, success, deleteData} = useTasks('http://localhost:3000/task')


    if (loading){
        return (<h1>Loading...</h1>)
    }

    function taskDelete(event, id) {
        event.preventDefault();
        deleteData(id);
    }

    return (
        

        <>
            {error && (<h1>Error: {error}</h1>)}
            {success != '' && success}
            <ul>
                {data && 
                data.map(d => {
                    return (<li key={d.id}>
                            {d.name} <br/>
                            {d.completed.toString()} 
                            <Link to={`edit/${d.id}`}>
                            <button>Edit</button>
                            </Link>
                            <button onClick={(event) => taskDelete(event, d.id)}>Delete</button>
                        </li>)
                    })}
            </ul>
        </>
    )
}

export default memo(Task)