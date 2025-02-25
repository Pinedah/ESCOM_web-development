/*
    Formulario de registro para version escolar.
    Autor: Francisco Pineda
    Version 1.0
*/

class Formulario {
    constructor() {
        this.nombre = "";
        this.apellido = "";
        this.edad = 0;
        this.correo = "";
        this.domicilio = "";
    }
    leer_form_completo() {
        this.nombre = document.getElementById('nombre').value;
        this.apellido = document.getElementById('apellido').value;
        this.edad = parseInt(document.getElementById('edad').value);
        this.correo = document.getElementById('mail').value;
        this.domicilio = document.getElementById('domicilio').value;
    }
    imprimir_form() {
        let resultado = document.getElementById('resultado');
        resultado.textContent = `Los datos son: ${this.nombre}, ${this.apellido}, ${this.edad}, ${this.correo}, ${this.domicilio}`;    
    }
}
function main() {
    const f = new Formulario();
    f.leer_form_completo();
    f.imprimir_form();
}

function lanzar_formulario(){
    console.log("FORMULARIO DE REGISTRO");
    let nombre_completo = leer_nombre();
    let edad = leer_edad();
    let correo = leer_correo();
    let domicilio = leer_domicilio();
    console.log("Los datos son:");
    console.log(nombre_completo);
    console.log(edad);
    console.log(correo);
    console.log(domicilio);
}

function leer_nombre(){
    let nombre = prompt("Ingrese tu nombre:");
    let apellido = prompt("Ingrese tu apellido:");
    return nombre, apellido;
}
function leer_correo(){
    let correo = prompt("Ingrese tu correo:");
    return correo;
}
function leer_edad(){
    let edad = prompt("Ingrese tu edad:");
    return parseInt(edad);
}
function leer_domicilio(){
    let domicilio = prompt("Ingrese tu domicilio:");
    return domicilio;
}