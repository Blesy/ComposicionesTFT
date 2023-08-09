import React, {useState} from 'react';
import '../../assets/styles/components/filters/Select.scss';
import principalState from '../../hooks/principalState';

const F_Principal = props => {
    const Data = principalState();
    const [state, setState] = useState({value: "any"});

    function handleChange(event) {    
        setState({value: event.target.value});
        props.principal(event.target.value);
    }

    return (
    <div className="f-select">
        <p>Rasgo a priorizar</p>
        <select name="principal" id="principal" value={state.value} onChange={handleChange}>
            <option value="any">Cualquiera</option>
            {
                Data.length > 0 ? 
                Data.map((item) => 
                    <option key={item} value={item}>{item.toUpperCase()}</option>
                    ) : null
            }
        </select>
    </div>
)};

export default F_Principal;