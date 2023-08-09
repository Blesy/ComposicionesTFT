import { useState, useEffect } from 'react';

const teamState = (team) => {
    const [ availables, setAvailables ] = useState([]);
    let request = team.map(item => item.name);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({champs: request})
    };
    useEffect(async () => {
        await fetch("https://sheltered-river-57888.herokuapp.com/findTeam", requestOptions)
        .then(response => response.json())
        .then(data => setAvailables(data.map(item => item.name)));
    }, []);
    return availables;
};

export default teamState;
