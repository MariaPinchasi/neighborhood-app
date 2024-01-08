export const selectStyle = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        borderColor: state.isFocused ? 'rgb(75, 172, 211)' : ' rgb(215, 236, 246)',
        width: '60rem',
        fontSize: '1.5rem'
    }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        fontSize: '1.5rem'
    })
}

export const selectStyleInForm = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        borderColor: state.isFocused ? 'rgb(75, 172, 211)' : ' rgb(215, 236, 246)',
        width: '38rem',
        hight: '4rem',
        fontSize: '1.4rem'
    }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        fontSize: '1.2rem'
    })
}