import React, {useState} from 'react';
import '../../assets/styles/components/filters/Select.scss';
import combinationState from '../../hooks/combinationState';

const F_Synergies = props => {
    const Data = combinationState();
    const [state, setState] = useState({value: "any"});

    function handleChange(event) {    
        setState({value: event.target.value});
        props.synergies(event.target.value);
    }

    return (
    <div className="f-select">
        <p>Combinación Minima</p>
        <select name="sinergias" id="sinergias" value={state.value} onChange={handleChange}>
            <option value="any" defaultValue>Cualquiera</option>
            {
                Data.length > 0 ? 
                Data.map((item) => 
                    <option key={item} value={item}>{item}</option>
                    ) : null
            }
        </select>
    </div>
)};

export default F_Synergies;