import { useState, useEffect } from 'react';

const teamState = (api) => {
    console.log('entra')
    const [ availables, setAvailables ] = useState([]);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({maxLen: 10, currentSolution: [], weight: 0, espatulas: [], fixed: 0})
    };
    useEffect(async () => {
        await fetch(api, requestOptions)
        .then(response => response.json())
        .then(data => setAvailables(data));
    }, []);
    console.log('casi')
    return availables;
};

export default teamState;
