import {memo} from 'react';
import { Outlet } from 'react-router-dom';


function MainLayout(){
    return (
        <main>
            <Outlet />
        </main>
    )
}

export default memo(MainLayout)