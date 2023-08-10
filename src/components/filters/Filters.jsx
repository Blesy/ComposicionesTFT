import React from 'react';
import '../../assets/styles/components/filters/Filters.scss';

const Filters = ({children}) => {
    return (
    <div className="filtros">
        {children}
    </div>
)};

export default Filters;