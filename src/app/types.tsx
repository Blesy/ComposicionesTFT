type TraitsType = {
    [key: string]: number[];
}
type Rankings = {
    platinum: number;
    gold: number;
    silver: number;
    bronze: number;
    '': number;
    [key: string]: number;
};
type ArrTraits = {
    quantity: any;
    arrComparators: number[];
    quality: string;
    net: number;
    name: string;
}
interface MyObjType {
    [key: string]: any;
}

export type {TraitsType, Rankings, ArrTraits, MyObjType};