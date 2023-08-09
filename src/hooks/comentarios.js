import { useState, useEffect } from 'react';

const comentarioState = (API) => {
    const [ comentarios, setComentarios ] = useState([]);
    
        useEffect(() => {
            fetch(API)
            .then(response => response.json())
            .then(data => setComentarios(data));
        }, []);
    return comentarios;
};

export default comentarioState;