import { DocumentReference } from "firebase/firestore";

export class Precio{
    id:string;
    nombre:string;
    costo:number;
    duracion:number;
    tipoDuracion:number;
    ref?: DocumentReference

    constructor(){
        this.id =""
        this.nombre =""
        this.costo =0
        this.duracion =0
        this.tipoDuracion =0
    }

}