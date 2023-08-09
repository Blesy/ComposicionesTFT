import { useState, useEffect } from 'react';

const totalState = () => {
    const [ total, setTotal ] = useState([]);
    useEffect(async () => {
        await fetch("https://sheltered-river-57888.herokuapp.com/findTotalChamps")
        .then(response => response.json())
        .then(data => setTotal(data));
    }, []);
    return total;
};

export default totalState;
