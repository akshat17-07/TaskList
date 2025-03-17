import { memo, lazy, Suspense, useContext, useState } from 'react';
import useTasks from '../hooks/useTasks';
import { useLocation} from 'react-router-dom';
import { ThemeContext } from '../App';
import { FaFilter } from "react-icons/fa";

const Task = lazy(() => import('./Task'));

function TaskList() {
    const { data, filterData, loading, error, success, deleteData, handleFilterData } = useTasks('http://localhost:3000/task');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('limit');
    const [searchInput, setSearchInput] = useState('')
    const[completedInput, setCompletedInput] = useState(0)
    const { theme } = useContext(ThemeContext);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    function taskDelete(event, id) {
        event.preventDefault();
        deleteData(id);
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(completedInput)
        console.log(searchInput)
        handleFilterData(searchInput, completedInput)
    }

    return (

        <div className={`md:p-5 sm:p-2 ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'}`}>
            <div className="flex gap-3">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="md:px-3 md:py-1 border rounded"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <select
                            className="md:px-3 md:py-1 md:mr-5 px-0 py-0 border rounded mr-3"
                            value={completedInput}
                            onChange={(e) => setCompletedInput(Number(e.target.value))}
                        >
                            <option value={0}>All</option>
                            <option value={1}>Completed</option>
                            <option value={2}>To Do</option>
                        </select>
                        <button type="submit" className="md:px-5 md:py-3 md:ml-5 border rounded bg-green-400">
                            <FaFilter />
                        </button>
                    </form>
                </div>
        
            {error && <h1>Error: {error}</h1>}
            {success && success}
            {filterData && filterData.length === 0 && <h1>There are no data</h1>}

            <ul>
                {filterData &&
                    filterData.slice(0, query ? query : filterData.length).map((d, index) => (
                        <li key={index}>
                                <Task d={d} taskDelete={taskDelete} />
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default memo(TaskList);
