import { memo, lazy, Suspense, useContext } from 'react';
import useTasks from '../hooks/useTasks';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../App';

const Task = lazy(() => import('./Task'));

function TaskList() {
    const { data, loading, error, success, deleteData } = useTasks('http://localhost:3000/task');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('limit');

    const { theme } = useContext(ThemeContext);

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

            <ul>
                {data &&
                    data.slice(0, query ? query : data.length).map((d, index) => (
                        <li key={index}>
                            <Suspense fallback={<h2>Loading</h2>}>
                                <Task d={d} taskDelete={taskDelete} />
                            </Suspense>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default memo(TaskList);
