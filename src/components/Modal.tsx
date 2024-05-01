import React from 'react'

const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className='w-[44rem] aspect-[4/3] flex flex-col justify-between mx-auto p-4 bg-gray-100 rounded-md shadow-md'>
            {children}
        </div>
    )
}

export default Modal