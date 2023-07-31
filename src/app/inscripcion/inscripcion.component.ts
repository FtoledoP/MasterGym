import { Component } from '@angular/core';
import { Inscripcion } from '../models/inscripcion';
import { Cliente } from '../models/cliente';
import { DocumentData, DocumentReference, DocumentSnapshot, addDoc, collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Precio } from '../models/precio';
import { MensajesService } from '../services/mensajes.service';

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
  idPrecio:string = 'null'

  constructor(private db: Firestore,
    private msj:MensajesService){

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
    const clienteVacioRef: DocumentReference<DocumentData> = doc(collection(this.db, 'clientes'), 'documento_vacio');
    this.inscripcion.cliente = clienteVacioRef;
  }

  guardar(){
    if(this.inscripcion.validar().esValido){
      let inscripcionAgregar = {
        fecha: this.inscripcion.fecha,
        fechaFinal: this.inscripcion.fechaFinal,
        cliente: this.inscripcion.cliente,
        precios: this.inscripcion.precios,
        subTotal: this.inscripcion.subTotal,
        isv: this.inscripcion.isv,
        total: this.inscripcion.total
      }
      const colInsc = collection(this.db, 'inscripciones')
      addDoc(colInsc, inscripcionAgregar)
      .then((resultado)=>{
        this.inscripcion = new Inscripcion()
        this.clienteSeleccionado = new Cliente()
        this.precioSeleccionado = new Precio()
        this.idPrecio = 'null'
        this.msj.mensajeCorrecto("Guardado", "Se guardo correctamente")
      })
    }else{
      this.msj.mensajeAdvertencia("Advertencia", this.inscripcion.validar().mensaje)
      
    }
    
    
  }

  seleccionarPrecio(evento:any){
    let id = evento.target.value
    if(id != null){
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
    }else{
      this.precioSeleccionado = new Precio()
      this.inscripcion.fecha = null
      this.inscripcion.fechaFinal = null
      this.inscripcion.precios = null
      this.inscripcion.subTotal = 0
      this.inscripcion.isv = 0
      this.inscripcion.total = 0
    }

  }

}
