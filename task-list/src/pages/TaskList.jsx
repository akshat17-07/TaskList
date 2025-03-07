import {memo, lazy, Suspense} from 'react'
import useTasks from '../hooks/useTasks';
import { Link } from 'react-router-dom';

const Task = lazy(() => import('./Task'))

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
                    return (
                        <li key={d.id}>
                        <Suspense fallback={<h2>Loading</h2>}>
                            <Task d={d} taskDelete={taskDelete}/>
                        </Suspense>
                        </li>
                    )
                    })}
            </ul>
        </>
    )
}

export default memo(TaskList)