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


document.getElementById('formulario').addEventListener('submit', async function(event) {
    event.preventDefault();  // Evita el envío tradicional del formulario
    
    // Capturar datos del formulario
    const formData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        edad: parseInt(document.getElementById('edad').value),
        correo: document.getElementById('mail').value,
        domicilio: document.getElementById('domicilio').value
    };
    
    try {
        // Enviar los datos al backend
        const response = await fetch('http://localhost:3000/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        document.getElementById('resultado').textContent = data.mensaje;
    } catch (error) {
        console.error("Error al enviar datos:", error);
    }
});

