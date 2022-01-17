import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';
import { Persona } from './persona.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url:string='https://crud-angular-92d94-default-rtdb.firebaseio.com/datos.json?auth=';

  constructor(private httpClient:HttpClient,
              private loginService:LoginService) { }

   token=this.loginService.getIdToken();
  cargarPersonas(){
    
    return this.httpClient.get(this.url+this.token);
  }

  guardarPersonas(personas:Persona[]){
    this.httpClient.put(this.url+this.token,personas)
        .subscribe(
          (response)=>{
            console.log('resultado guardar personas: '+response);
          },
          (error)=>console.log('Error al guardar personas: '+error)
        );
  }

  modificarPersona(index:number,persona:Persona){
    let url:string;
    url='https://crud-angular-92d94-default-rtdb.firebaseio.com'+'/datos/'+index+'.json?auth='+this.token;
    console.log('url de modificarPersona: '+url);

    this.httpClient.put(url,persona)
        .subscribe(
          (response)=>{
            console.log('resultado al modificar persona: '+response);

          },
          (error)=>console.log('Error al modificar persona: ' +error)
        );
  }


  eliminarPersona(index:number){
    let url:string;
    url='https://crud-angular-92d94-default-rtdb.firebaseio.com'+'/datos/'+(index)+'.json?auth='+this.token;
    console.log('url de eliminarPersona'+url);

    this.httpClient.delete(url)
        .subscribe(
          (response)=>{
            console.log('Resultado al eliminar Persona: '+response);
          },
          (error)=>console.log('Error al eliminar Persona'+error)
        );
  }


}
