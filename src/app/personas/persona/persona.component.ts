import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Persona } from 'src/app/persona.model';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  @Input() persona:Persona;
  @Input() indice:number;
  @Output() imagen:string;

  constructor() { }

  ngOnInit(): void {
    this.imagen=this.persona.imagen;
  }

}
