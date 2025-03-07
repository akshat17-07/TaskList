import {memo, useState} from 'react'
import useEditTask from '../hooks/useEditTask'
import {useParams} from 'react-router-dom'


function EditTask(){

    const { id } = useParams();
    const {task, setTask, loading, error, success, updateTask} = useEditTask(id, "http://localhost:3000/task")

    if (loading){
        return (<h1>Loading...</h1>)
    }

    function handleNameChange(event){
        event.preventDefault();
        setTask(prevTask => {return {
            ...prevTask,
            name: event.target.value,
        }})
    }
    function handleCompletedChange(event){
        event.preventDefault();
        setTask(prevTask => {return {
            ...prevTask,
            completed: event.target.value,
        }})
    }

    function handleTaskUpdate(event){
        event.preventDefault();

        updateTask(id, JSON.stringify(task))
        
    }

    return (
        <>
            {error != '' && error}
            {success != '' && success}
            { task &&
            <span>
                <input type="text" 
                    value={task.name} 
                    onChange={(event) => handleNameChange(event)}
                />
                
                <input type="checkbox" id="" 
                    value={task.completed} 
                    onChange={(event) => handleCompletedChange(event)}
                />

                <button onClick={(event) => handleTaskUpdate(event)}>
                    Edit Task
                </button>
                
            </span>}
        </>
    )
}

export default memo(EditTask)