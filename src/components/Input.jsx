import React from 'react'

const Input = React.forwardRef(({ type = "text", className = "", label, handleFile, ...props }, ref) => {
    const id = React.useId()
    if (type == "file") {
        console.log(handleFile);
    }

    return (
        <div className='w-full'>
            <label htmlFor={id}> {label} </label>
            <input id={id} type={type} ref={ref} onInput={(e) => {
                if (type == "file") {
                    let file = e.target.files[0];
                    console.log(file);
                    handleFile(file)
                }
            }} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} {...props} />
        </div>
    )
})

export default Input
