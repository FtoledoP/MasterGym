import { Component } from '@angular/core';
import { Inscripcion } from '../models/inscripcion';
import { Cliente } from '../models/cliente';
import { DocumentReference, DocumentSnapshot, collection, getDoc, getDocs, query } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Precio } from '../models/precio';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent {
  inscripcion:Inscripcion = new Inscripcion()
  clienteSeleccionado:Cliente = new Cliente()
  precios: Precio[] = new Array <Precio>()
  precioSeleccionado?: Precio = new Precio()

  constructor(private db: Firestore){

  }

  ngOnInit(){
    const colPrecios = collection(this.db, 'precios')
    const q = query(colPrecios)

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc: DocumentSnapshot<any>) => {

        let precio = doc.data() as Precio
        precio.id = doc.id
        precio.ref = doc.ref
        this.precios.push(precio)

      });
      
    }).catch((error) => {
      console.log("Error al obtener los documentos:", error);
    });

  }

  asignarCliente(cliente:Cliente){
    this.inscripcion.cliente = cliente.ref
    this.clienteSeleccionado = cliente
  }

  eliminarCliente(){
    this.clienteSeleccionado = new Cliente()
    this.inscripcion.cliente = undefined
  }

  guardar(){
    console.log(this.inscripcion);
    
  }

  seleccionarPrecio(evento:any){
    let id = evento.target.value

    this.precioSeleccionado = this.precios.find(x=> x.id == id)
    this.inscripcion.precios = this.precioSeleccionado?.ref

    this.inscripcion.subTotal = this.precioSeleccionado?.costo
    this.inscripcion.isv = this.inscripcion?.subTotal * 0.15
    this.inscripcion.total = this.inscripcion.subTotal + this.inscripcion.isv

    this.inscripcion.fecha = new Date()

    if(this.precioSeleccionado?.tipoDuracion == 1){

      let dias: number = this.precioSeleccionado.duracion * 1
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias)
      this.inscripcion.fechaFinal = fechaFinal

    }
    if(this.precioSeleccionado?.tipoDuracion == 2){

      let dias: number = this.precioSeleccionado.duracion * 7
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias)
      this.inscripcion.fechaFinal = fechaFinal
      
    }
    if(this.precioSeleccionado?.tipoDuracion == 3){

      let dias: number = this.precioSeleccionado.duracion * 15
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias)
      this.inscripcion.fechaFinal = fechaFinal
      
    }
    if(this.precioSeleccionado?.tipoDuracion == 4){
      let anno = this.inscripcion.fecha.getFullYear()
      let meses = this.inscripcion.fecha.getMonth() + this.precioSeleccionado.duracion
      let dias = this.inscripcion.fecha.getDate()
      let fechaFinal = new Date(anno, meses, dias)
      this.inscripcion.fechaFinal = fechaFinal
      
    }
    if(this.precioSeleccionado?.tipoDuracion == 5){

      let anno = this.inscripcion.fecha.getFullYear() + this.precioSeleccionado.duracion
      let meses = this.inscripcion.fecha.getMonth() 
      let dias = this.inscripcion.fecha.getDate()
      let fechaFinal = new Date(anno, meses, dias)
      this.inscripcion.fechaFinal = fechaFinal
      
    }
    
  }

}
