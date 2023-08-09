import React from 'react';
import '../../assets/styles/components/filters/Filters.scss';

const Filters = ({children}) => {
    const refreshPage = () => {
        window.location.reload();  
    }
    return (
    <div className="filtros">
        {children}
    </div>
)};

export default Filters;