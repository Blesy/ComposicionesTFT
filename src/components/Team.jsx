import React from 'react';
import '../assets/styles/components/Team.scss';

const Team = props => (
    <div className="team">
        <h2>{props.titulo}</h2>
        {props.children}
    </div>
);

export default Team;