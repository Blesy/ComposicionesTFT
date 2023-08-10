import React from 'react';
import '../assets/styles/components/Team.scss';

const Team = props => (
    <div className="team">
        <div>
            <h2>{props.titulo}</h2>
            {
                props?.score >= 0 ? 
                <span>Score: {props.score}</span> :
                null
            }
        </div>
        {props.children}
    </div>
);

export default Team;