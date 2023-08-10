import React, {useState} from 'react';
import '../../assets/styles/components/Trait.scss';
import Images from '../../assets/static/Traits/TraitsImages';
import Image from 'next/image';

const V_Spatula = props => {
    let emblemas = props.actives
    return (
    <div className="f-select">
        <div className="trait emblems">
            {
                emblemas.length > 0 ?
                emblemas.map((item, index) =>
                <div className="tooltip cursor" onClick={() => props.remEmblem(index)}>
                    <div className="hexagon hexagon2">
                        <div className="hexagon-in1">
                            <div className={"hexagon-in2"}>
                                <Image src={Images[item.replace(/\s/g, '')]} alt={item}/>
                            </div>
                        </div>
                    </div>
                </div>
                ) : null
            }
        </div>
    </div>
)};

export default V_Spatula;