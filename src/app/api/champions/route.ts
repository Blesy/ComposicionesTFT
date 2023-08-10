import { NextResponse } from "next/server";
import LISTA from '../../../data/lista.json'
import RASGOS from '../../../data/rasgosAleanning.json'

interface MyObjType {
    [key: string]: any;
}

export async function GET(req: Request, res: Response) {
    let statusCode: number = 0;
    let initResponse: any = {
        data: {}
    };
    try {
        statusCode = 200
        initResponse.data = [...LISTA]
        //initResponse.data = [{name: "Ahri"}]
    } catch (err) {
        console.error(err);
        statusCode = 500;
    }
    finally
    {
        if (statusCode !== 200 )
        {
            return NextResponse.json(statusCode)
        }
        else
        {
            return NextResponse.json(initResponse.data)
        }
    }
}

export async function POST(req: Request, res: Response) {
    let {maxLen, currentSolution, weight, espatulas, fixed} = await req.json()
    const comparator = {...RASGOS}
    const objects = LISTA
    let statusCode = 200
    let result
    try {
        const initialTemperature = 1000;
        const MAXMULTIPLIER = Object.keys(LISTA).length - 1;
        const coolingRate = 0.995;
        const CHAMPSPASSED = currentSolution.length
        let temperature = initialTemperature;
        // Genera una solución inicial aleatoria
        for (let i = 0; i < maxLen - CHAMPSPASSED; i++) {
            let randomNumber = generateRandomNumber(MAXMULTIPLIER, currentSolution, objects)
            currentSolution.push(objects[randomNumber]);
        }

        let bestSolution = [...currentSolution];
        let bestScore = objectiveFunction(bestSolution, comparator, weight, espatulas);
        
        while (temperature > 1) {
            // Genera una solución vecina
            let neighborSolution;
            neighborSolution = generateNeighbor(currentSolution, objects, fixed, MAXMULTIPLIER);

            let currentScore = objectiveFunction(currentSolution, comparator, weight, espatulas);
            let neighborScore = objectiveFunction(neighborSolution, comparator, weight, espatulas);

            // Si el vecino es mejor o se acepta según el criterio de Metropolis
            if (neighborScore > currentScore) {// || Math.random() < Math.exp((currentScore - neighborScore) / temperature)) {
                currentSolution = [...neighborSolution];
                currentScore = neighborScore;
            }

            // Actualiza la mejor solución encontrada
            if (currentScore > bestScore) {
                bestSolution = [...currentSolution];
                bestScore = currentScore;
            }

            // Enfriar el sistema
            temperature *= coolingRate;
        }
        result = {
            bestSolution: [...bestSolution],
            bestScore
        }
    } catch (err) {
        result = 'Error'
        statusCode = 500
    }
    finally
    {
        if (statusCode !== 200 )
        {
            return NextResponse.json(result)
        }
        else
        {
            return NextResponse.json(result)
        }
    }
}

function generateRandomNumber(MAXMULTIPLIER: number, arr: any[], objects: any[]) {
    let num: number
    do {
        num = Math.floor(Math.random() * MAXMULTIPLIER)
    } while (isObjectInArray(objects[num], arr))
    return num
}

function isObjectInArray(obj: any[], array: any[]) {
    return array.some(character => {
        for (let key in obj) {
            if (obj[key] !== character[key]) {
                return false;  // Si alguna propiedad no coincide, el objeto no es igual
            }
        }
        return true;  // Si todas las propiedades coinciden, el objeto es igual
    });
}

function objectiveFunction(solution: any[], comparator: any, weight: number, espatulas: string[]) {
    // Convertir valores de las propiedades a números y contar su frecuencia
    let frequency: MyObjType = {};
    let peso = 0;
    solution.forEach(obj => {
        ['Rasgo1', 'Rasgo2', 'Rasgo3'].forEach(rasgo => {
            let value: string = obj[rasgo];
            frequency[value] = (frequency[value] || 0) + 1;
        });
        peso += obj.Peso
    });
    espatulas.forEach(obj => {
        frequency[obj] = (frequency[obj] || 0) + 1;
    })
    delete frequency['cero']

    // Calcular la diferencia con respecto a los objetivos
    let totalDifference = 0;
    for (let key in frequency) {
        let mappedComparator = [...comparator[key].map((target: number) => {
            let filter = frequency[key] - target
            return filter >= 0 ? filter : filter * -1 + 1.1
        })]
        let minDifference = Math.min(...mappedComparator);
        let index = mappedComparator.indexOf(minDifference)
        totalDifference += frequency[key] >= comparator[key].slice(-1)[0] ? comparator[key][index] : 0
    }
    totalDifference *= weight ? peso*(weight/1000)+1 : 1
    return totalDifference;  // Queremos maximizar esta diferencia
}

function generateNeighbor(solution: any[], objects: any[], fixed: number, MAXMULTIPLIER: number) {
    let neighbor = [...solution];

    // Reemplazar un objeto aleatorio
    let random1 = Math.floor(Math.random() * (neighbor.length - fixed)) + fixed
    //let test = [...neighborNumbers] //test
    let random2 = generateRandomNumber(MAXMULTIPLIER, neighbor, objects)
    neighbor[random1] = objects[random2];

    return neighbor
}
