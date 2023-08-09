import React, {useState} from 'react';
import '../../assets/styles/components/filters/Select.scss';

const F_Weight = props => {
    const [state, setState] = useState(props.weight)

    return (
    <div className="f-select">
        <label htmlFor="weight">Peso Tiers</label>
        <input type="number" id="weight" name="weight" min="0" value={state}
        onChange={e => {
            let value = e.currentTarget.value
            setState(value)
            props.changeWeight(value)
        }} />
    </div>
)};

export default F_Weight;