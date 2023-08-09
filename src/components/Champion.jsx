import React, {useState} from 'react';
import '../assets/styles/components/Champion.scss';
import Images from '../assets/static/Champs/images';
import ItemsImages from '../assets/static/Items/ItemsImages';
import Image from 'next/image'

const Champion = props => {
    let images;
    if (props.items) {
        images = [];
        for (const item of props.items) {
            images.push(
                <Image src={Images[item.name]} alt={item.name}/>
            )
        }
    }

    return (
    <div className="champion">
        <p>{props.name}</p>
        <div className={props.classes}
            onClick={event => props.team(props.campeon)}>
            <Image src={Images[props.name.replace(/\s/g, '')]} alt={props.name}/>
        </div>
        {images}
    </div>
)}

export default Champion;