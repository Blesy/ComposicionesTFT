import { useState, useEffect } from 'react';

const combinationState = () => {
    const [ combination, setCombination ] = useState([]);
    useEffect(async () => {
        await fetch("https://sheltered-river-57888.herokuapp.com/findSynergies")
        .then(response => response.json())
        .then(data => setCombination(data));
    }, []);
    return combination;
};

export default combinationState;
