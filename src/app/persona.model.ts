export class Persona{
    constructor(public nombre:string,public apellido:string,public imagen:string){}

    toString():string{
        return this.nombre + ''+ this.apellido + ''+ this.imagen;
    }
}