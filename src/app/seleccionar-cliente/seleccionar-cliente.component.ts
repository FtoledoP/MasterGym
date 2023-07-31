import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';
import { DocumentSnapshot, collection, getDocs, query } from 'firebase/firestore';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent {
  clientes:Cliente[] = new Array<Cliente>();
  @Input('nombre')nombre!:string 
  @Output('seleccionoCliente')seleccionoCliente = new EventEmitter();
  @Output('canceloCliente')canceloCliente = new EventEmitter()

  constructor(private db: Firestore){

  }

  ngOnInit(){
    const colRef = collection(this.db, 'clientes')
    const q = query(colRef);
    this.clientes.length = 0;

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc: DocumentSnapshot<any>) => {

        let cliente: any = doc.data()
        cliente.id = doc.id
        cliente.ref = doc.ref
        cliente.visible = false
        this.clientes.push(cliente)
      });
      
    }).catch((error) => {
      console.log("Error al obtener los documentos:", error);
    });
  }

  buscarClientes(evento:any){
    let nombre = evento.target.value
    console.log(nombre);

    this.clientes.forEach((cliente)=>{
      if(cliente.nombre.toLowerCase().includes(nombre.toLowerCase())){
        cliente.visible = true;
      }else{
        cliente.visible = false
      }
    })
    
  }

  seleccionarCliente(cliente:Cliente){
    this.nombre = cliente.nombre + ' ' + cliente.apellido
    this.clientes.forEach((cliente)=>{
      cliente.visible = false
    })
    console.log(cliente);
    
  }

  cancelarCliente(){
    this.nombre = '';
  }

}
