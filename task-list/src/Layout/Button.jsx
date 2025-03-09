import {ThemeContext} from '../App.jsx'
import { useContext } from 'react'
import {clsx} from 'clsx'



function Button(){
    
    const {theme, toggleTheme} = useContext(ThemeContext)
    
    const buttonClass = clsx(
        {
            "px-4 py-2 text-white rounded-md mb-4 ml-4 mt-5" : true,
            'bg-blue-500': theme === 'light',
            'bg-blue-900': theme != 'light'
        }
    )

    return (
        <button 
        onClick={toggleTheme} 
            className={buttonClass}
        >
            Toggle Theme
        </button>
    )
}

export default Button