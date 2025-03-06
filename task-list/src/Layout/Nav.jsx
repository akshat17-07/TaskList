import {memo} from 'react';
import {Link} from 'react-router-dom'


function Nav(){
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/add'>Add Task</Link>
        </nav>
    )
}

export default memo(Nav)