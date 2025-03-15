import { memo, lazy, Suspense, useContext, useMemo } from 'react';
import useTasks from '../hooks/useTasks';
import useFilterTask from '../hooks/useFilterTask'; 
import { ThemeContext } from '../App';

const Task = lazy(() => import('./Task'));

function TaskList() {
    const { data, loading, error, success, deleteData } = useTasks('http://localhost:3000/task');
    const { searchFilter, completedFilter } = useFilterTask(); 
    const { theme } = useContext(ThemeContext);

    const filteredData = useMemo(() => {
        if (!data) return [];

        return data.filter((task) => {

            console.log(data)
            console.log(searchFilter, completedFilter)
            const matchesSearch = task.name.toLowerCase().includes(searchFilter.toLowerCase());

            const matchesCompleted =
                completedFilter === 0 ||
                (completedFilter === 1 && task.completed) ||
                (completedFilter === 2 && !task.completed);

            return matchesSearch && matchesCompleted;
        });
    }, [data, searchFilter, completedFilter]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    function taskDelete(event, id) {
        event.preventDefault();
        deleteData(id);
    }



    return (
        <div className={`p-5 ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'}`}>
            {error && <h1>Error: {error}</h1>}
            {success && success}
            {filteredData.length === 0 && <h1>No tasks found</h1>}

            <ul>
                {filteredData.map((d, index) => (
                    <li key={index}>
                        <Task d={d} taskDelete={taskDelete} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default memo(TaskList);
