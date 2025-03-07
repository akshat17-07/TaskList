import {memo} from 'react'
import useTasks from '../hooks/useTasks';
import { Link } from 'react-router-dom';
import Task from './Task'

function TaskList(){

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
                    return (<Task d={d}/>)
                    })}
            </ul>
        </>
    )
}

export default memo(TaskList)