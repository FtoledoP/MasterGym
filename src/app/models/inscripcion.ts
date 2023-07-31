import { DocumentReference } from "firebase/firestore"
import { retry } from "rxjs"

export class Inscripcion{
    fecha!: Date | null
    fechaFinal!: Date | null
    cliente!: DocumentReference
    precios!: DocumentReference | undefined | null
    subTotal!:any 
    isv!: number 
    total!:number

    constructor(){
        this.fecha = null
        this.fechaFinal = null
        this.cliente = this.cliente
        this.precios = this.precios
        this.subTotal = this.subTotal
        this.isv = this.isv
        this.total = this.total
    }

    validar():any{
        let respuesta ={
            esValido: false,
            mensaje: ""
        }

        if(this.cliente == null || this.cliente == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = "Por favor seleccione un cliente"
            return respuesta
        }
        if(this.precios == null || this.precios == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = "No ha seleccionado un precio"
            return respuesta
        }
        if(this.fecha == null || this.fecha == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = "No tiene fecha de inicio"
            return respuesta
        }
        if(this.fechaFinal == null || this.fechaFinal == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = "No tiene fecha final"
            return respuesta
        }
        if(this.subTotal <= 0 || this.subTotal == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = "No se ha podido calcular el subtotal"
            return respuesta
        }
        if(this.isv <= 0 || this.isv == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = "No ha seleccionado el isv"
            return respuesta
        }
        if(this.total <= 0 || this.total == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = "No ha seleccionado el total"
            return respuesta
        }
        respuesta.esValido = true
        return respuesta

    }
}