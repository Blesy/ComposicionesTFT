import { NextResponse } from "next/server";
import LISTA from '../../../data/lista.json'
import RASGOS from '../../../data/rasgosAleanning.json'

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
        result = bestSolution
    } catch (error) {
        res.status(500).send({err: error.message})
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

function generateRandomNumber(MAXMULTIPLIER: number, arr, objects) {
    let num: number
    do {
        num = Math.floor(Math.random() * MAXMULTIPLIER)
    } while (arr.includes(objects[num]))
    return num
}

function objectiveFunction(solution, comparator, weight: number, espatulas: string[]) {
    // Convertir valores de las propiedades a números y contar su frecuencia
    let frequency = {};
    let peso = 0;
    solution.forEach(obj => {
        ['Rasgo1', 'Rasgo2', 'Rasgo3'].forEach(rasgo => {
            let value = obj[rasgo];
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
        let mappedComparator = [...comparator[key].map(target => {
            let filter = frequency[key] - target
            return filter >= 0 ? filter : filter * -1 + 1.1
        })]
        let minDifference = Math.min(...mappedComparator);
        let index = mappedComparator.indexOf(minDifference)
        totalDifference += frequency[key] >= comparator[key].slice(-1)[0] ? comparator[key][index] : 0
    }
    totalDifference *= weight ? peso/weight+1 : 1
    return totalDifference;  // Queremos maximizar esta diferencia
}

function generateNeighbor(solution, objects, fixed, MAXMULTIPLIER: number) {
    let neighbor = [...solution];

    // Reemplazar un objeto aleatorio
    let random1 = Math.floor(Math.random() * (neighbor.length - fixed)) + fixed
    //let test = [...neighborNumbers] //test
    let random2 = generateRandomNumber(MAXMULTIPLIER, neighbor, objects)
    neighbor[random1] = objects[random2];
    if (hasDuplicates(neighbor)) {
        console.log(3, random1, random2, (new Set(neighbor)).size, neighbor.length)
    } //testing
    // }

    return neighbor
}

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}
