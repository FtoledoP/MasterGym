import { DocumentReference } from "firebase/firestore";

export class Precio{
    id!:string
    nombre!:string;
    costo!:number; 
    duracion!:number;
    tipoDuracion!:number;
    ref!: DocumentReference

    constructor(){
        this.ref = this.ref
        this.costo = 0
    }

}