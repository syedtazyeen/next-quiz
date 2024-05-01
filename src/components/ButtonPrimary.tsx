import React from 'react'

const ButtonPrimary: React.FC<{ onClick?: any, disabled?: boolean, label: string }> = ({ onClick, label, disabled = false }) => {
    return (
        <button
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
            onClick={onClick}
            disabled={disabled}>
            {label}
        </button>
    )
}

export default ButtonPrimary