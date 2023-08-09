import React, {useState} from 'react';
import '../../assets/styles/components/filters/Select.scss';
import totalState from '../../hooks/totalState';

const F_Quantity = props => {
    const Data = totalState();
    const [state, setState] = useState({value: 9});

    function handleChange(event) {    
        setState({value: event.target.value});
        props.quantity(event.target.value);
    }

    return (
    <div className="f-select">
        <p>N° de campeones</p>
        <select name="cantidad" id="cantidad" value={state.value} onChange={handleChange}>
            {
                Data.length > 0 ? 
                Data.map((item) => 
                    <option key={item} value={item}>{item}</option>
                    ) : null
            }
        </select>
    </div>
)};

export default F_Quantity;