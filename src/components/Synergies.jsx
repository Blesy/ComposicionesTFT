import React from 'react';
import '../assets/styles/components/Synergies.scss';

const Synergies = props => (
    <aside className="synergies">
        {props.children}
        <div className="total">
            <span>Total: {props.total}</span>
        </div>
    </aside>
);

export default Synergies;