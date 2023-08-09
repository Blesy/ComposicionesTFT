import React from 'react';
import '../assets/styles/components/Buttons.scss';

const Buttons = props => (
    <aside className="buttons">
        <button className='btns'
            onClick={event => props.team()}>
            <h3>Clear</h3>
        </button>
        <button className='btns'
            onClick={event => props.recomend(props.campeon)}>
            <h3>Recomend</h3>
        </button>
        <button className='btns'
            onClick={event => props.apply()}>
            <h3>Apply</h3>
        </button>
    </aside>
);

export default Buttons;