import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent {
  clientes: any[] = new Array<any>()

  constructor(private firestore:Firestore) {
  }

  ngOnInit() {
    // this.leerClientes().subscribe((resultado) => {
    //   console.log(resultado)
    //   this.clientes = resultado
    // })


    this.clientes.length = 0
    const coleccionClientes = collection(this.firestore, 'clientes');
    collectionData(coleccionClientes, {idField: 'id'}).subscribe((resultado) =>{
      console.log(resultado)

      for (let item of resultado){
        console.log(item['id']);
        
      }

    })


  }

  leerClientes(): Observable<any[]>{
    const coleccionClientes = collection(this.firestore, 'clientes');
    return collectionData(coleccionClientes) as Observable<any[]>
  }

}
