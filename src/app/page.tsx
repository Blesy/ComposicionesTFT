"use client"
import React, { useEffect, useState } from 'react';

//Json data
import Traits from '../data/rasgosAleanning.json'
import LISTA from '../data/lista.json'

// Hooks
import useInitialState from '../hooks/useinitialState';

// Componentes
import '../assets/styles/App.scss';
import Container from '../components/Container';
import Team from '../components/Team';
import Champion from '../components/Champion';
import Synergies from '../components/Synergies';
import Trait from '../components/Trait';
import Champions from '../components/Champions';
import Buttons from '../components/Buttons'

// Filtros de busqueda
import Filters from '../components/filters/Filters';
import F_Spatula from '../components/filters/F_Spatula';
import F_Quantity from '../components/filters/F_Quantity';
import F_Weight from '../components/filters/F_Weight';
import V_Spatula from '../components/filters/V_Spatula'


// Interfaces y tipos
import { TraitsType, Rankings, ArrTraits, MyObjType } from './types';

//Constantes globales
const CHAMPIONS = '/api/champions';
const TRAITS: TraitsType = {...Traits}

export default function Home() {
    const initialState = useInitialState(CHAMPIONS)
    const [team, setTeam] = useState<MyObjType[]>([]);
    const [recomended, setRecomended] = useState<MyObjType[]>([])
    const [traits, setTraits] = useState<ArrTraits[]>([]);
    const [total, setTotal] = useState(0);
    const [fixed, setFixed] = useState(0);
    const [maxLen, setMaxLen] = useState(9);
    const [weight, setWeight] = useState(0);
    const [emblemas, setEmblemas] = useState<string[]>([])
    const [score, setScore] = useState(0)
    const [selected, setSelected] = useState('')

    const add = async (prop: any) => {
        let included = false;
        let tempTeam = [];
        for (const champ of team) {
            tempTeam.push(champ);
            if (champ.name === prop.name)
                included = true;
        }
        if (!included)
            tempTeam.push(prop);
        setTeam(tempTeam);
    }
    const rem = async (prop: number) => {
        let tempTeam = [...team]
        tempTeam.splice(prop, 1);
        setTeam(tempTeam)
    }
    
    const getTotal = (tempTrait: any[]) => {
        let sumTraits = 0;
        tempTrait.forEach(element => {
            sumTraits += element.net
        });
        setTotal(sumTraits);
    }
    const clear = () => {
        setTeam([])
        setTraits([])
        setTotal(0)
        setFixed(0)
    }
    const recomend = async () => {
        let currentSolution = team.map(val => LISTA[val.index])
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({maxLen, currentSolution, weight, espatulas: emblemas, fixed})
        };
        
        let data = await fetch(CHAMPIONS, requestOptions)
        let result = await data.json()
        setRecomended(result?.bestSolution)
        setScore(result?.bestScore)
    }
    const apply = () => {
        setTeam(recomended)
    }
    const fix = (val: number) => {
        let tempTeam = [...team]
        let counter = fixed
        let champToFix = tempTeam.splice(val, 1)[0];
        if (val >= fixed) {
            counter++
            tempTeam.unshift(champToFix)
        } else {
            counter--
            tempTeam.push(champToFix)
        }
        setFixed(counter)
        setTeam(tempTeam)
    }
    const addEmblems = (val: string) => {
        let current = emblemas.length > 0 ? [...emblemas] : []
        current.push(val)
        setEmblemas(current)
    }
    const remEmblems = (index: number) => {
        let current = [...emblemas]
        current.splice(index, 1)
        setEmblemas(current)
    }

    useEffect(() => {
        const getTraits = (tempTeam: any[]) => {
            let teamTrait: MyObjType = {};
            for (const array of tempTeam) {
                ['Rasgo1', 'Rasgo2', 'Rasgo3'].forEach(rasgo => {
                    let value = array[rasgo];
                    teamTrait[value] = (teamTrait[value] || 0) + 1;
                });
            }
            if (emblemas.length > 0) {
                emblemas.forEach(rasgo => {
                    let value = rasgo;
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
            const order: Rankings = {'platinum': 1, 'gold': 2, 'silver': 3, 'bronze': 4, '': 5}
            arrayTraits.sort((a, b) => order[a.quality] - order[b.quality]);
            console.log(arrayTraits)
            getTotal(arrayTraits);
            setTraits(arrayTraits);
        }
        getTraits(team)
    }, [emblemas, team])
    
  return (
    <div className="App">
            <Container>
                <Team titulo={'Recomended Team'} score={score}>
                    {
                        recomended.length > 0 ?
                        recomended.map((item, index) =>
                            <Champion key={index} name={item.name} campeon={item} classes={"image"} />
                        ) : null
                    }
                </Team>
                <Buttons team={() => clear()} recomend={() => recomend()} apply={() => apply()}/>
                <Team titulo={'Current Team'}>
                    {
                        team.length > 0 ?
                        team.map((item, index) =>
                            <Champion key={index} name={item.name} team={() => rem(index)} campeon={item} classes={"image pointer"}
                            pin={index < fixed ? 'fill' : 'blank'} fix={() => fix(index)} />
                        ) : null
                    }
                </Team>
                <Synergies total={total}>
                    {
                        traits.length > 0 ?
                        traits.map((item) => 
                            <Trait key={item.name} trait={item} select={(val: string) => setSelected(val)}/>
                        ) : null
                    }
                </Synergies>
                <Champions>
                    {
                        initialState.map((item) => 
                            <Champion key={item.name} name={item.name} team={(value: MyObjType) => {add(value)}} campeon={item}
                            classes={!team.some(e => e.name === item.name) ? "image pointer" : "image gray"} selected={selected} />
                        )
                    }
                </Champions>
                <Filters>
                    <F_Weight weight={weight} changeWeight={(val: number) => setWeight(val)}/>
                    <F_Quantity quantity={maxLen} changeSize={(val: number) => setMaxLen(val)} />
                    <F_Spatula addSpatula={(val: string) => addEmblems(val)}/>
                    <V_Spatula actives={emblemas} remEmblem={((val:number) => remEmblems(val))} />
                </Filters>
            </Container>
        </div>
  )
}
