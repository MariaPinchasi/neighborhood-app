import React from 'react'
import { servicesTypes } from '../data/data';
import Select from 'react-select';

const SelectService = ({ handleChange, selectStyle }) => {
    const options = servicesTypes.map(serviceType => ({
        value: serviceType.name,
        label: serviceType.name,
        id: serviceType.id,
    }));

    return (
        <Select
            styles={selectStyle}
            options={options}
            onChange={handleChange}
            placeholder="Search service"
        />
    )
}

export default SelectService