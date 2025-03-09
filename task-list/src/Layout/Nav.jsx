import {memo} from 'react';
import {Link} from 'react-router-dom'
import { clsx } from 'clsx';

function Nav(){

    const navClass = clsx({
        'm-0 p-5 flex gap-5 justify-center': true,
        'bg-gray-900' : true
    })
    
    console.log("nav bar rerender")

    return (
        <nav className={navClass}>
            <Link to='/' className='text-2xl font-bold text-gray-200'>Home</Link>
            <Link to='/add' className='text-2xl font-bold text-gray-200'>Add Task</Link>
        </nav>
    )
}

export default memo(Nav)