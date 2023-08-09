import React from 'react';
import '../assets/styles/components/Container.scss';

const Container = ({children}) => (
    <div className="container">
        {children}
    </div>
);

export default Container;