import React from 'react'
function AppButton(props) {
    const handleClick = (e) => {
        if (props.event) {
            props.event(true)
        }
    }
    return (
        <button
            onClick={handleClick}
            type="button"
            data-mdb-ripple={props.ripple ? "true" : "false"}
            data-mdb-ripple-color={props.color || "light"}
            className="inline-block px-6 py-2.5 bg-blue-600 dark:text-gray-500 dark:active:text-gray-100 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800   active:text-gray-100 active:shadow-lg text-gray-700 transition duration-150 ease-in-out"
        >{props.icon && (<props.icon />)}{props.label || 'Label'}</button>
    )
}

export default AppButton