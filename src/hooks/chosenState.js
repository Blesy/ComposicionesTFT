import { useState, useEffect } from 'react';

const principalState = () => {
    const [ principal, setPrincipal ] = useState([]);
    useEffect(async () => {
        await fetch("https://sheltered-river-57888.herokuapp.com/findChosen")
        .then(response => response.json())
        .then(data => setPrincipal(data));
    }, []);
    return principal;
};

export default principalState;