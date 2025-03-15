import { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { ThemeContext } from '../App';
import Button from './Button'

function Nav() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const navClass = clsx(
        'm-0 p-5 flex items-center justify-between', // Updated flex classes
        {
            'bg-gray-900': theme !== 'light',
            'bg-gray-200': theme === 'light',
        }
    );

    const navLinkClass = clsx('text-2xl font-bold', {
        'text-gray-800': theme === 'light',
        'text-gray-200': theme !== 'light',
    });

    console.log('Nav bar rerender');

    return (
        <nav className={navClass}>
            <div className="flex gap-5">
                <Link to="/" className={navLinkClass}>
                    Home
                </Link>
                <Link to="/add" className={navLinkClass}>
                    Add Task
                </Link>
            </div>
            <Button/>
        </nav>
    );
}

export default memo(Nav);
