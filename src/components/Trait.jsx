import React from 'react';
import '../assets/styles/components/Trait.scss';
import Images from '../assets/static/Traits/TraitsImages';
import Image from 'next/image'

const Trait = props => {
    let counter = [];
    let icon;
    let selected = props.trait.quantity;
    props.trait.arrComparators.forEach(val => {
        if (val == props.trait.net) {
            counter.push(<span className="selected">{val}</span>);
            icon = props.trait.quality
        } else {
            counter.push(<span>{val}</span>);
        }
        counter.push(<span>/</span>);
    })
    counter.pop()
    return (
    <div className="trait">
        <div className="tooltip">
            <span className="tooltiptext">{props.trait.name}</span>
            <div className="hexagon hexagon2">
                <div className="hexagon-in1">
                    <div className={icon + " hexagon-in2"}>
                        <Image src={Images[props.trait.name.replace(/\s/g, '')]} alt={props.trait.name}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="counter">
            {counter}
        </div>
        <div className="count">
            <span>{selected}</span>
        </div>
    </div>
)};

export default Trait;