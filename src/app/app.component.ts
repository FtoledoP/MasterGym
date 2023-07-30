import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mastergym';
  usuario: firebase.User | null = null; 
  cargando: boolean = true;

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.user.subscribe((usuario) => {
        this.cargando = false;
        this.usuario = usuario;
    });
  }

  login() {
    this.afAuth.signInWithEmailAndPassword('franco@gmail.com', 'franco');
  }
  
  logout() {
    this.afAuth.signOut();
  }
}
