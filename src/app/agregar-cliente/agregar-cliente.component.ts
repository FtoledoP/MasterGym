import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@angular/fire/storage';
import { ref, uploadBytesResumable, UploadTaskSnapshot, getDownloadURL } from 'firebase/storage';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent {
  formularioCliente: FormGroup = {} as FormGroup;
  porcentajeSubida: number = 0;
  urlImagen:string =""
  esEditable:boolean = false
  id:string =""

  constructor(private fb: FormBuilder, 
    private storage: Storage, 
    private db: Firestore,
    private activeRoute: ActivatedRoute) {}

  ngOnInit() {    

    this.id = this.activeRoute.snapshot.params['clienteID']
    if(this.id != undefined){
      this.esEditable = true
      const docRef = doc(this.db, 'clientes', this.activeRoute.snapshot.params['clienteID'])
      getDoc(docRef)
      .then(cliente =>{
        this.formularioCliente.setValue({
          nombre: cliente.data()?.['nombre'],
          apellido: cliente.data()?.['apellido'],
          correo: cliente.data()?.['correo'],
          cedula: cliente.data()?.['cedula'],
          fechaNacimiento: new Date(cliente.data()?.['fechaNacimiento'].seconds * 1000).toISOString().substring(0, 10),
          telefono: cliente.data()?.['telefono'],
          imgUrl: ''
        })

        this.urlImagen = cliente.data()?.['imgUrl']
    })
    }
    

    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      cedula: [''],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      imgUrl: ['', Validators.required]
    });
  }

  agregar() {
    this.formularioCliente.value.imgUrl = this.urlImagen
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)
    console.log(this.formularioCliente.value);
    addDoc(collection(this.db, 'clientes'), this.formularioCliente.value)
    .then((resultado) =>{
      console.log("Registrado");
    })
  }

  editar(){
    this.formularioCliente.value.imgUrl = this.urlImagen
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)

    const docRef = doc(this.db, 'clientes', this.id)
    updateDoc(docRef, this.formularioCliente.value)
  }

  subirImagen(evento: any) {
    if(evento.target.files.length > 0){
      let nombre = new Date().getTime().toString()
      let archivo = evento.target.files[0];
      let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'))

      const storageRef = ref(this.storage, `clientes/${nombre}${extension}`);
      const tareaSubida = uploadBytesResumable(storageRef, archivo);

      tareaSubida.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          // Calcula el porcentaje de subida
          this.porcentajeSubida = parseInt(((snapshot.bytesTransferred / snapshot.totalBytes * 100).toString()));
        },
        (error: any) => {
          console.log('Error al subir el archivo:', error);
        },
        () => {
          console.log('Archivo subido exitosamente.');
          getDownloadURL(storageRef)
          .then((respuesta) => {
            this.urlImagen = respuesta
          })
          .catch((error) => console.log(error))

      }
    );
    }
  }
}
