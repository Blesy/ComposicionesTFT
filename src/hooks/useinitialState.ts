import { useState, useEffect } from 'react';

const useInitialState = (API: string) => {
    type myObj = {
        [key: string]: String | Number
    }
    const [ estados, setEstados ] = useState<myObj[]>([]);
    
        useEffect(() => {
            fetch(API)
            .then(response => response.json())
            .then(data => setEstados(data));
        }, [API]);
    return estados;
};

export default useInitialState;
