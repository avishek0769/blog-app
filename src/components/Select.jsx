import React from 'react'

function Select({options, label, className="", ...props}, ref) {

    return (
        <div className='w-full'>
            {label && <label htmlFor={React.useId()}></label>}
            <select id={React.useId()} ref={ref} {...props} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
                {options?.map(option => (
                    <option value={option} key={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
