import React, {useState} from 'react';
import '../../assets/styles/components/filters/Select.scss';
import chosenState from '../../hooks/chosenState';

const F_Chosen = props => {
    const Data = chosenState();
    const [state, setState] = useState({value: "any"});

    function handleChange(event) {
        setState({value: event.target.value});
        props.chosen(event.target.value);
    }

    return (
    <div className="f-select">
        <p>Elegido</p>
        <select name="chosen" id="chosen" value={state.value} onChange={handleChange}>
            <option value="no">No</option>
            {
                Data.length > 0 ? 
                Data.map((item) => 
                    <option key={item} value={item}>{item.toUpperCase()}</option>
                    ) : null
            }
        </select>
    </div>
)};

export default F_Chosen;