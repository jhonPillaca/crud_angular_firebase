import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../persona.model';
import { PersonasService } from '../personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {


  personas:Persona[]=[];


  constructor(private personasService:PersonasService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.personasService.obtenerPersonas()
    .subscribe(
      (personas:any)=>{
        this.personas=personas;
        this.personasService.setPersonas(this.personas);
        console.log('obtener personas suscriber: '+ this.personas);
      }
    );
  }

  irAgregar(){
    this.router.navigate(['./personas/agregar'],{queryParams:{modoEdicion:0}});
  }
  

}
