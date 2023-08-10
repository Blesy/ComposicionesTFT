import React, {useState} from 'react';
import '../assets/styles/components/Champion.scss';
import Images from '../assets/static/Champs/images';
import otherImages from '../assets/static/Others/otherImages';
import Image from 'next/image'

const Champion = props => {
    const CHAMP = props.campeon
    const RASGOS = [CHAMP?.Rasgo1, CHAMP?.Rasgo2, CHAMP?.Rasgo3]
    let images;
    let pin = props.pin == 'fill' ? otherImages.pinFill : otherImages.pinBlank
    let selected = !RASGOS.includes(props.selected) && props.selected ? 'blured' : ''
    props.classes.includes('gray') && selected ? selected = 'bluredgray' : null
    let border = ' border' + CHAMP.Costo
    return (
    <div className="champion">
        {
            !props.pin ?
            <p>{props.name}</p>:
            <Image src={pin} className='pin' alt='pin'
            onClick={() => props.fix(CHAMP)}/>
        }
        {
            props.team ? 
            <div className={props.classes + border + ' ' + selected}
                onClick={() => props.team(CHAMP)}>
                <Image src={Images[props.name.replace(/\s/g, '')]} alt={props.name}/>
            </div> :
            <div className={props.classes + border}>
            <Image src={Images[props.name.replace(/\s/g, '')]} alt={props.name}/>
        </div> 
        }
        {images}
    </div>
)}

export default Champion;