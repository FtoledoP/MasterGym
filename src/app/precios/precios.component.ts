import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { collection, addDoc, query, DocumentSnapshot, getDocs, doc, updateDoc } from 'firebase/firestore';
import { MensajesService } from '../services/mensajes.service';
import { Precio } from '../models/precio';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent {
  formularioPrecio: FormGroup = {} as FormGroup;
  precios:Precio[] = new Array<Precio>();
  esEditar:boolean = false
  id:string =""

  constructor(private fb:FormBuilder,
    private db:Firestore,
    private msj:MensajesService){

  }

  ngOnInit(){

    this.formularioPrecio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    })
    this.mostrarPrecios()
  }

  mostrarPrecios(){
    const colRef = collection(this.db, 'precios')
    const q = query(colRef);
    this.precios.length = 0;

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

  agregar(){
    const colRef = collection(this.db, 'precios')
    addDoc(colRef, this.formularioPrecio.value)
    .then(()=>{
      this.msj.mensajeCorrecto("Agregado", "Se agrego correctamente")
      this.formularioPrecio.reset()
      this.mostrarPrecios()
    })
    .catch(()=>{
      this.msj.mensajeError("Error!", "Ha ocurrido un error al agregar")
    })
  }

  editarPrecio(precio:Precio){
    this.esEditar = true
    this.formularioPrecio.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion
    })

    this.id = precio.id
    this.mostrarPrecios()

  }

  editar(){
    const docRef = doc(this.db, 'precios', this.id)
    updateDoc(docRef, this.formularioPrecio.value)
    .then(()=>{
      this.msj.mensajeCorrecto("Editado", "Se edito correctamente")
      this.formularioPrecio.reset()
      this.esEditar = false
    })
    .catch(()=>{
      this.msj.mensajeError("Error!", "Ocurrio un error")
    })
  }

}
