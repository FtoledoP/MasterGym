import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent {
  usuario: firebase.User | null = null; 

  constructor(private afAuth: AngularFireAuth){

  }

  ngOnInit(){

  }

  logout() {
    this.afAuth.signOut();
  }

}
