import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string;

  constructor(private auth: AngularFireAuth,
    private router: Router) { }


  async register(email: string, password: string) {
    try {
      return await this.auth.createUserWithEmailAndPassword(email, password);

    } catch (err) {
      console.log('error en login: ', err);
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      return await this.auth.signInWithEmailAndPassword(email, password);

    } catch (err) {
      console.log('error en login: ', err);
      return null;
    }
  }

  async loginWithGoogle(email: string, password: string) {
    try {
      return await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (err) {
      console.log('error en login con google: ', err);
      return null;
    }
  }

  otherLogin(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          console.log(response);
          firebase.auth().currentUser?.getIdToken().then(
            token => {
              this.token = token;
              console.log('token obtenido: ', this.token);
            }
          )
          this.router.navigate(['/']);
        }
      )
  }

  getIdToken(){
    return this.token;
  }

  isAutenticado(){
    return this.token!=null;
  }

  logout(){
    console.log('logout');
    firebase.auth().signOut().then(()=>{
      this.token = '';
      console.log('dentro de signout');
      this.router.navigate(['login']);
    }).catch(err=>console.log(err));
  }


}
