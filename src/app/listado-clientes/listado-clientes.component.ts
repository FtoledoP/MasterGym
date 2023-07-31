import { Component } from '@angular/core';
import { Firestore, collection, query, getDocs, DocumentSnapshot, collectionData } from '@angular/fire/firestore';
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

    this.clientes.length = 0;
    const coleccionClientes = collection(this.firestore, 'clientes');
    const q = query(coleccionClientes);

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc: DocumentSnapshot<any>) => {

        let cliente = doc.data()
        cliente.id = doc.id
        cliente.ref = doc.ref
        this.clientes.push(cliente)

      });
    }).catch((error) => {
      console.log("Error al obtener los documentos:", error);
    });
  }

  leerClientes(): Observable<any[]>{
    const coleccionClientes = collection(this.firestore, 'clientes');
    return collectionData(coleccionClientes) as Observable<any[]>
  }
}
