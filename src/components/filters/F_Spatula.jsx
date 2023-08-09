import React, {useState} from 'react';
import '../../assets/styles/components/filters/Select.scss';
import ESPATULAS from '../../data/rasgos2.json'

const F_Spatula = props => {
    let emblemas = ['None']
    Object.keys(ESPATULAS).forEach((val) => {
        if (ESPATULAS[val]["espatula"]) emblemas.push(val)
    })

    const [state, setState] = useState("None");

    function handleChange(event) {
        let value = event.target.value
        //setState(value);
        props.addSpatula(value);
    }

    return (
    <div className="f-select">
        <p>Agregar Espatula</p>
        <select name="espatula" id="espatula" value={state} onChange={handleChange}>
            {emblemas.map(val => 
                <option key={val} value={val}>{val}</option>
            )}
        </select>
    </div>
)};

export default F_Spatula;