import React from 'react';
import '../assets/styles/components/Comentarios.scss';
import * as agent from 'superagent';
import { useState } from 'react';

const Comentarios = (props) => {
    const [comentarios, setComentarios] = useState([]);
    const [comentario, setComentario] = useState("");
    const change = (evt) => {
        setComentario(evt.target.value);
    }

    const get = async() => {
        await agent.get('https://sheltered-river-57888.herokuapp.com/getComents')
        .then((data) => {
            setComentarios(data.body)
        })
        .catch(function (error)
        {
            alert("No se puedieron cargar los comentarios.");
            if (error.response)
            {
                console.log(error.response.status);
            }
        });
    }

    const guardar = async () => {
        if (comentario.length < 5) {
            alert("Debe agregar mas texto")
            return;
        }
        await agent.post('https://sheltered-river-57888.herokuapp.com/saveComent')
        .send({
            comentario
        })
        .catch(function (error)
        {
            alert("No se pudo agregar su comentario.");
            if (error.response)
            {
                console.log(error.response.status);
            }
        }).finally(()=>{setComentario("");})
    }
    return (
        <div className="comentarios">
            <label htmlFor="agregar">Comentario</label>
            <textarea name="comentario" id="agregar" value={comentario} onChange={change} cols="30" rows="10"/>
            <input type="button" className="btn" value="Agregar comentario" onClick={guardar}/>
            <input type="button" className="btn" value="Cargar comentarios" onClick={get}/>
            {
                comentarios.map((item) => 
                <p className="cargados">{item.comentario}</p>)
            }
        </div>
    )
};

export default Comentarios;