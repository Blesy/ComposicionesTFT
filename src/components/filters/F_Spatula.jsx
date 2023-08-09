import React, {useState} from 'react';
import '../../assets/styles/components/filters/Select.scss';

const F_Spatula = props => {
    const [state, setState] = useState({value: "any"});

    function handleChange(event) {
        let value;
        switch (event.target.value) {
            case "0":
                value = false;
                break;
            case "1":
                value = true;
                break;
            default:
                value = "any";
                break;
        }
        setState({value: event.target.value});
        props.spatula(value);
    }

    return (
    <div className="f-select">
        <p>Espatula</p>
        <select name="espatula" id="espatula" value={state.value} onChange={handleChange}>
            <option value="any">Cualquiera</option>
            <option value="1">SI</option>
            <option value="0">No</option>
        </select>
    </div>
)};

export default F_Spatula;