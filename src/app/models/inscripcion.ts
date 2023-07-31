import { DocumentReference } from "firebase/firestore"

export class Inscripcion{
    fecha!: Date | null
    fechaFinal!: Date | null
    cliente!: DocumentReference | undefined
    precios!: DocumentReference | undefined
    subTotal!:any 
    isv!: number 
    total!:number

    constructor(){
        this.fecha = null
        this.fechaFinal = null
        this.cliente = this.cliente
        this.precios = this.precios
        this.subTotal = this.subTotal
        this.isv = 0
        this.total = this.total
    }
}