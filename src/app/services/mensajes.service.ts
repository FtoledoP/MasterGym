import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  mensajeCorrecto(titulo:string, mensaje:string){
    Swal.fire({
    title: titulo,
    text: mensaje,
    icon: 'success',
    confirmButtonText: 'OK'
    })
  }

  mensajeAdvertencia(titulo:string, mensaje:string){
    Swal.fire({
    title: titulo,
    text: mensaje,
    icon: 'warning',
    confirmButtonText: 'OK'
    })
  }

  mensajeError(titulo:string, mensaje:string){
      Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }

}
