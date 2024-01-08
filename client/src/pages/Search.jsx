import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useGlobalServicesContext } from '../hooks/useGlobalServicesContext';
import ServiceCard from '../components/ServiceCard';
import SelectService from '../components/SelectService';
import { selectStyle } from '../style/selectStyle';

const Search = () => {
    const { fetchServices, services, isLoading } = useGlobalServicesContext();

    useEffect(() => {
        fetchServices();
    }, []);

    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchServices(query);
    }
    const handleChange = (selected) => {
        setQuery(selected.value);
    }
    return (
        <div className='search-container'>
            <form onSubmit={handleSubmit}>
                <SelectService handleChange={handleChange} selectStyle={selectStyle} />
                <button type="submit"><FaSearch /></button>
            </form>
            {isLoading &&
                <div className='loading'></div>}
            {!isLoading && query && services.length === 0 &&
                <p>{`No ${query} published in your neighborhood`}</p>}
            {!isLoading && <main className='services-list'>
                {services.map(singleService => {
                    return (
                        <ServiceCard key={singleService._id} {...singleService} />
                    )

                })}
            </main>}
        </div>
    )
}

export default Search