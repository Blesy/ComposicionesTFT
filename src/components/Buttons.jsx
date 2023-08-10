import React from 'react';
import '../assets/styles/components/Buttons.scss';

const Buttons = props => (
    <aside className="buttons">
        <button className='btns'
            onClick={() => props.team()}>
            <h3>Clear</h3>
        </button>
        <button className='btns'
            onClick={() => props.recomend(props.campeon)}>
            <h3>Recomend</h3>
        </button>
        <button className='btns'
            onClick={() => props.apply()}>
            <h3>Apply</h3>
        </button>
    </aside>
);

export default Buttons;