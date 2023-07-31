import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent {
  formularioPrecio: FormGroup = {} as FormGroup;

  constructor(private fb:FormBuilder){

  }

  ngOnInit(){

    this.formularioPrecio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    })

  }

  agregar(){
    console.log(this.formularioPrecio.value)
  }

}
