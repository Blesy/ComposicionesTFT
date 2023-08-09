import React, {useState} from 'react';
import '../assets/styles/components/Champion.scss';
import Images from '../assets/static/Champs/images';
import ItemsImages from '../assets/static/Items/ItemsImages';
import otherImages from '../assets/static/Others/otherImages';
import Image from 'next/image'

const Champion = props => {
    let images;
    let pin = props.pin == 'fill' ? otherImages.pinFill : otherImages.pinBlank
    // if (props.items) {
    //     images = [];
    //     for (const item of props.items) {
    //         images.push(
    //             <Image src={Images[item.name]} alt={item.name}/>
    //         )
    //     }
    // }

    return (
    <div className="champion">
        {
            !props.pin ?
            <p>{props.name}</p>:
            <Image src={pin} className='pin' alt='pin'
            onClick={() => props.fix(props.campeon)}/>
        }
        <div className={props.classes}
            onClick={event => props.team(props.campeon)}>
            <Image src={Images[props.name.replace(/\s/g, '')]} alt={props.name}/>
        </div>
        {images}
    </div>
)}

export default Champion;