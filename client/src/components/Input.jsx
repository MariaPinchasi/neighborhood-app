import React from 'react'

const Input = ({ label, type, name, value, error, handleChange }) => {
    if (name === 'description' || name === 'description') {
        return (
            <div className="input-group">
                <textarea type={type} name={name} placeholder={label} value={value} onChange={handleChange} />
                <div className="error-message">{error}</div>
            </div>
        )
    }
    if (name === 'rating') {
        return (
            <div className="input-group">
                <label htmlFor={name}>{`Rating: ${value}/10`}</label>
                <input type={type} min='0' max='10' name={name} placeholder={label} value={value} onChange={handleChange} />
                <div className="error-message">{error}</div>
            </div>
        )
    }
    return (
        <div className="input-group">
            <input type={type} name={name} placeholder={label} value={value} onChange={handleChange} />
            <div className="error-message">{error}</div>
        </div>
    )
}

export default Input