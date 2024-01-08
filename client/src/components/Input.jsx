import React from 'react'

const Input = ({ label, type, name, value, error, handleChange }) => {
    return (
        <div className="input-group">
            <input type={type} name={name} placeholder={label} value={value} onChange={handleChange} />
            <div className="error-message">{error}</div>
        </div>
    )
}

export default Input