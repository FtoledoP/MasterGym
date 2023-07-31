import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@angular/fire/storage';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent {
  formularioCliente: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private storage: Storage){

  }

  ngOnInit(){
    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      cedula: [''],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      imgUrl: ['', Validators.required]
    })
  }

  agregar(){
    console.log(this.formularioCliente.value);
  }

  subirImagen(evento:any){
    
    let archivo = evento.target.files[0]

    console.log(archivo);
  }

}
