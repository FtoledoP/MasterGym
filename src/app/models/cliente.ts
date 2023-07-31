import { DocumentReference } from "firebase/firestore"

export class Cliente{
    id:string
    nombre:string
    apellido:string
    correo:string
    fechaNacimiento: Date
    imgUrl:string
    telefono:number
    cedula:string
    ref?: DocumentReference
    visible:boolean

    constructor(){
        this.id =""
        this.nombre =""
        this.apellido ="",
        this.correo =""
        this.fechaNacimiento = new Date()
        this.imgUrl =""
        this.telefono =0
        this.cedula =""
        this.visible = false
    }

}