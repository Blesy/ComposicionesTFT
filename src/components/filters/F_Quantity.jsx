import React, {useState} from 'react';
import '../../assets/styles/components/filters/Select.scss';

const F_Quantity = props => {
    const Data = [3,4,5,6,7,8,9,10,11,12,13,14,15];
    return (
    <div className="f-select">
        <p className='paraph'>N° of champs</p>
        <select name="cantidad" id="cantidad" value={props.quantity} 
        onChange={(event) => props.changeSize(event.target.value)}>
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