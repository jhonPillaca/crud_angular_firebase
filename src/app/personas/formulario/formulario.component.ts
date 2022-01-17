import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/persona.model';
import { PersonasService } from 'src/app/personas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  nombreInput:string;
  apellidoInput:string;
  photoInput:string;

  index:number;
  modoEdicion:number;

  // variables imgs
  imagenPreview:string;
  files:any =[];
  loading:boolean=false;

  constructor(private personasService:PersonasService,
              private router:Router,
              private route:ActivatedRoute,
              private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.index=this.route.snapshot.params['id'];
    this.modoEdicion=+this.route.snapshot.queryParams['modoEdicion'];
    if(this.modoEdicion!=null && this.modoEdicion==1){
      let persona:Persona=this.personasService.encontrarPersona(this.index);
      if(persona !=null){
        //cargamos los valores en el formulario solo si hay uno
        this.nombreInput=persona.nombre;
        this.apellidoInput=persona.apellido;
        this.imagenPreview=persona.imagen;
      }
    }
  }

  onFileSelected(event:any){
    const image=event.target.files[0];
    console.log(image);

    if(['image/png','image/jpeg'].includes(image.type)){
      console.log('si es una imagen');

      this.files.push(image)
      this.blobFile(image).then((res:any)=>{
        this.imagenPreview=res.base;
        
      })
    }else{
      console.log('no es imagen');
    }
  }

  onGuardarPersona(){
    if(this.nombreInput !=null && this.apellidoInput !=null){
      let persona:Persona=new Persona(this.nombreInput,this.apellidoInput,this.imagenPreview);
      if(this.modoEdicion!=null && this.modoEdicion==1){
        this.personasService.modificarPersona(this.index,persona);
      }else{
        this.personasService.agregarPersona(persona);
      }
      this.router.navigate(['personas']);
    }else{
      return;
    }
  }

  onEliminarPersona(){
    if(this.index!=null){
      this.personasService.eliminarPersona(this.index)
    }

    this.router.navigate(['personas']);
  }


  blobFile=async ($event:any)=> new Promise((resolve,reject)=>{
    try {
      const unsafiImg = window.URL.createObjectURL($event);
      const image:any = this.sanitizer.bypassSecurityTrustHtml(unsafiImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };
      return null;
    } catch (e) {
      return null;
    }
  })


}
