import {memo} from 'react';
import {Link} from 'react-router-dom'
import { clsx } from 'clsx';
import { ThemeContext } from '../App';
import { useContext } from 'react';
function Nav(){

    const {theme} = useContext(ThemeContext)

    const navClass = clsx({
        'm-0 p-5 flex gap-5 justify-center': true,
        'bg-gray-900' : theme != 'light',
        'bg-gray-200' : theme === 'light'
    })

    const navLinkClass = clsx({
        'text-2xl font-bold': true,
        'text-gray-800': theme === 'light',
        'text-gray-200': theme != 'light'
    })
    
    console.log("nav bar rerender")

    return (
        <nav className={navClass}>
            <Link to='/' className={navLinkClass}>Home</Link>
            <Link to='/add' className={navLinkClass}>Add Task</Link>
        </nav>
    )
}

export default memo(Nav)