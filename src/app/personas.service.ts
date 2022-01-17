import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { LoginService } from './login/login.service';
import { Persona } from './persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  personas:Persona[]=[];

  constructor(private loginService:LoginService,
              private dataService:DataService) { }

  setPersonas(personas:Persona[]){
    this.personas=personas;
  }

  obtenerPersonas(){
    return this.dataService.cargarPersonas();
  }

  agregarPersona(persona:Persona){
    
    if(this.personas==null){
      this.personas=[];
    }
    this.personas.push(persona);
    this.dataService.guardarPersonas(this.personas);
  }

  encontrarPersona(index:number){
    let persona:Persona=this.personas[index];
    return persona;
  }

  modificarPersona(index:number,persona:Persona){
    let persona1=this.personas[index];
    persona1.nombre=persona.nombre;
    persona1.apellido=persona.apellido;
    persona1.imagen=persona.imagen;
    this.dataService.modificarPersona(index,persona);
  }

  modificarPersonas(){
    if(this.personas!=null)
    // guarda toda la lista de persona nuevamente para generar el id
      this.dataService.guardarPersonas(this.personas);
  }

  eliminarPersona(index:number){
    this.personas.splice(index,1);
    this.dataService.eliminarPersona(index);
    this.modificarPersonas();
  }
}
