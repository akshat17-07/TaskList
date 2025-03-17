import {ThemeContext} from '../App.jsx'
import { useContext } from 'react'
import {clsx} from 'clsx'



function Button(){
    
    const {theme, toggleTheme} = useContext(ThemeContext)
    
    const buttonClass = clsx(
        {
            "md:px-4 md:py-2 text-white rounded-md md:mb-4 md:ml-4 md:mt-5 md:text-xl text-md sm:text-lg sm:py-1 sm:px-2 sm:mb-2 sm:ml-2 sm:mt-2" : true,
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