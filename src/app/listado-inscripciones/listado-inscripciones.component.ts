import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Inscripcion } from '../models/inscripcion';
import { DocumentData, DocumentSnapshot, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss']
})
export class ListadoInscripcionesComponent {
  inscripciones: any[] = []
  cliente:Cliente = new Cliente()

  constructor(private db: Firestore){
    
  }

  ngOnInit(){
    this.inscripciones.length = 0
    const colIns = collection(this.db, 'inscripciones')
    const colCli = collection(this.db, 'clientes')
    const q = query(colIns)

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc: DocumentSnapshot<any>) => {

        let inscripcionObtenida = doc.data()
        inscripcionObtenida.fecha = new Date(inscripcionObtenida.fecha.seconds*1000)
        inscripcionObtenida.fechaFinal = new Date(inscripcionObtenida.fechaFinal.seconds*1000)
        inscripcionObtenida.id = doc.id
        let cliTemp = this.obtenerClientePorId(inscripcionObtenida.cliente.id)
        
        // console.log(inscripcionObtenida.cliente.id);
        
        cliTemp.subscribe((resultado)=>{
          //console.log(resultado);
          inscripcionObtenida.clienteObtenido = resultado
          this.inscripciones.push(inscripcionObtenida)
          console.log(inscripcionObtenida);
          
        });
        
        
        

      });
    }).catch((error) => {
      console.log("Error al obtener los documentos:", error);
    });


    

  }

  obtenerClientePorId(clienteId: string): Observable<Cliente | null> {
    const clienteRef = doc(this.db, 'clientes', clienteId);
    return new Observable((observer) => {
      getDoc(clienteRef)
        .then((docSnapshot: DocumentSnapshot<DocumentData>) => {
          if (docSnapshot.exists()) {
            const cliente: Cliente = docSnapshot.data() as Cliente;
            cliente.id = docSnapshot.id;
            cliente.ref = docSnapshot.ref;
            observer.next(cliente);
          } else {
            observer.next(null);
          }
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

}
