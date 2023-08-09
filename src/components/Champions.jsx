import React from 'react';
import '../assets/styles/components/Champions.scss';

const Champion = ({children}) => (
    <div className="champions">
        {children}
    </div>
);

export default Champion;