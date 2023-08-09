import { useState, useEffect } from 'react';

const useInitialState = (API) => {
    const [ estados, setEstados ] = useState([]);
    
        useEffect(() => {
            fetch(API)
            .then(response => response.json())
            .then(data => setEstados(data));
        }, []);
    return estados;
};

export default useInitialState;
