import { NextResponse } from "next/server";
import LISTA from '../../../data/lista.json'
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