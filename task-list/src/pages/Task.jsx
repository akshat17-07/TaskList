import {memo} from 'react'
import { useEffect, useState, setTimeout } from 'react';
import useTasks from '../hooks/useTasks';

function Task(){

    const {data, loading, error, success, deleteData} = useTasks('http://localhost:3000/task')

    
    
    if (error){
        return (<h1>Error: {error}</h1>)
    }

    if (loading){
        return (<h1>Loading...</h1>)
    }

    function taskDelete(event, id) {
        event.preventDefault();
        deleteData(id);
    }

    return (
        

        <>
            {success != '' && success}
            <ul>
                {data && 
                data.map(d => {
                    return (<li key={d.id}>
                            {d.name} <br/>
                            {d.completed} 
                            <button>Edit</button>
                            <button onClick={(event) => taskDelete(event, d.id)}>Delete</button>
                        </li>)
                    })}
            </ul>
        </>
    )
}

export default memo(Task)