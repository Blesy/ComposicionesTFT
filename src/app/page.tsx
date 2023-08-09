"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

//Json data
import Traits from '../data/rasgosAleanning.json'

// Hooks
import useInitialState from '../hooks/useinitialState';
import teamState from '../hooks/teamState';

// Componentes
import '../assets/styles/App.scss';
import Header from '../components/Header';
import Container from '../components/Container';
import Team from '../components/Team';
import Champion from '../components/Champion';
import Synergies from '../components/Synergies';
import Trait from '../components/Trait';
import Champions from '../components/Champions';
import Banner from '../components/Banner';
import Loading from '../components/Loading';
import Comentarios from '../components/Comentarios';

// Filtros de busqueda
import Filters from '../components/filters/Filters';
import F_Synergies from '../components/filters/F_Synergies';
import F_Chosen from '../components/filters/F_Chosen';
import F_Spatula from '../components/filters/F_Spatula';
import F_Quantity from '../components/filters/F_Quantity';
import F_Principal from '../components/filters/F_Principal';

const CHAMPIONS = '/api/champions';
const TRAITS = {...Traits}

export default function Home() {
    const initialState = useInitialState(CHAMPIONS)
    const [team, setTeam] = useState([]);
    const [traits, setTraits] = useState([]);
    const [total, setTotal] = useState(0);

    const add = async (prop) => {
        let included = false;
        let tempTeam = [];
        for (const champ of team) {
            tempTeam.push(champ);
            if (champ.name === prop.name)
                included = true;
        }
        if (!included)
            tempTeam.push(prop);
        //tempTeam = await getItems(tempTeam);
        setTeam(tempTeam);
        getTraits(tempTeam);
    }
    const rem = async (prop) => {
        let tempTeam = [...team]
        tempTeam.splice(prop, 1);
        setTeam(tempTeam)
        //await req(tempTeam, filters);
        getTraits(tempTeam);
    }
    const getTraits = (tempTeam) => {
        let teamTrait = {};
        for (const array of tempTeam) {
            ['Rasgo1', 'Rasgo2', 'Rasgo3'].forEach(rasgo => {
                let value = array[rasgo];
                teamTrait[value] = (teamTrait[value] || 0) + 1;
            });    
        }
        delete teamTrait['cero']
        let arrayTraits = Object.keys(teamTrait).map(val => {
            let quality = ''
            let net = 0
            let arrComparators = TRAITS[val]
            let quantity = teamTrait[val]
            const qualities = arrComparators.length > 3 ? ['platinum', 'gold', 'silver', 'bronze'] : ['gold', 'silver', 'bronze'];

            const element = arrComparators.find((comp, index) => {
                if (quantity >= comp) {
                    quality = qualities[index] || 'bronze';
                    net = comp;
                    return true;
                }
                return false;
            });
            let obj = { quantity, arrComparators, quality, net, name: val }
            return obj 
        })
        const order = {'platinum': 1, 'gold': 2, 'silver': 3, 'bronze': 4, '': 5}
        arrayTraits.sort((a, b) => order[a.quality] - order[b.quality]);
        console.log(arrayTraits)
        getTotal(arrayTraits);
        setTraits(arrayTraits);
    }
    const getTotal = (tempTrait) => {
        let sumTraits = 0;
        tempTrait.forEach(element => {
            sumTraits += element.net
        });
        setTotal(sumTraits);
    }
    
  return (
    <div className="App">
            <Container>
                 <Team>
                    {
                        team.length > 0 ?
                        team.map((item, index) =>
                            <Champion key={index} name={item.name} items={item.items} team={() => rem(index)} campeon={item} classes={"image pointer"}
                            log={item} />
                        ) : null
                    }
                </Team>
                <Synergies total={total}>
                    {
                        traits.length > 0 ?
                        traits.map((item) => 
                            <Trait key={item.name} trait={item} />
                        ) : null
                    }
                </Synergies>
                <Champions>
                    {
                        initialState.map((item) => 
                            <Champion key={item.name} name={item.name} team={(value) => {add(value)}} campeon={item}
                            classes={!team.some(e => e.name === item.name) ? "image pointer" : "image gray"} />
                        )
                    }
                </Champions>
                {/* <Filters>
                    <F_Chosen chosen={value => {let filter = {...filters}; filter.chosen = value; req(team, filter)}} />
                    <F_Synergies synergies={value => {let filter = {...filters}; filter.synergie = value; req(team, filter)}} />
                    <F_Principal principal={value => {let filter = {...filters}; filter.principal = value; req(team, filter)}} />
                    <F_Spatula spatula={value => {let filter = {...filters}; filter.spatula = value; req(team, filter)}} />
                    <F_Quantity quantity={value => {let filter = {...filters}; filter.numberChamps = value; req(team, filter)}} />
                </Filters>
                <Comentarios/> */}
            </Container>
        </div>
  )
}
