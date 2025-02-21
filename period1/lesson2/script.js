
function verificarEdad() {
    let nombre = document.getElementById('nombre').value;
    let edad = parseInt(document.getElementById('edad').value);
    let resultado = document.getElementById('resultado');
    
    if (nombre === '' || isNaN(edad)) {
        resultado.textContent = 'DATOS VACÍOS';
        resultado.style.color = 'white';
        return;
    }

    if(edad > 122){ // la persona con mas años vividos alcanzó esa edad
        resultado.textContent = `${nombre}, no te creo... -.- `;
        resultado.style.color = 'white';
        return
    }

    if (edad >= 18) {
        resultado.textContent = `${nombre}, eres mayor de edad.`;
        resultado.style.color = 'green';
    }else {
        resultado.textContent = `${nombre}, eres menor de edad.`;
        resultado.style.color = 'orange';
    }
}


function obtenerFechaNacimiento(texto) {
    // Expresión regular para coincidir con fechas en formato DD/MM/YYYY o DD-MM-YYYY
    const regex = /\b(\d{2})[-\/](\d{2})[-\/](\d{4})\b/;

    const match = texto.match(regex);

    if (match) {
        // Si hay coincidencia, formatear la fecha (por ejemplo: 23/02/1999)
        const fechaNacimiento = `${match[1]}/${match[2]}/${match[3]}`;
        return fechaNacimiento;
    } else {
        return null; // Si no se encuentra ninguna fecha
    }
}

function verificarEdadINE(fechaDeNacimiento){
    anio = parseInt(fechaDeNacimiento.slice(-4));
    return (2025 - anio >= 18);
}

document.getElementById('inputImagen').addEventListener('change', function(event) {
    const archivo = event.target.files[0];
    const resultado = document.getElementById('resultado-ine');

    if (archivo) {

        resultado.innerHTML = 'Cargando y procesando imagen...';

        // Usar librería Tesseract.js para leer el texto de la imagen
        Tesseract.recognize(
            archivo,
            'spa', // Idioma de la imagen
            {
                logger: (m) => console.log(m) // Para ver los logs del proceso de OCR
            }
        ).then(({ data: { text } }) => {

            // Mostrar el texto extraído en la consola
            console.log(text)

            // Extraer la fecha de nacimiento usando regex
            const fechaNacimiento = obtenerFechaNacimiento(text);

            // lógica del funcionamiento 
            if (fechaNacimiento) {
                resultado.innerHTML = `Fecha de Nacimiento:<br>${fechaNacimiento}<br><br>`;

                // verificar si es mayor de edad
                if(verificarEdadINE(fechaNacimiento)){
                    resultado.innerHTML += `MAYOR DE EDAD`;
                    resultado.style.color = 'green';
                }else{
                    resultado.innerHTML += `MENOR DE EDAD`;
                    resultado.style.color = 'orange';
                }
            } else {
                resultado.innerHTML = 'No se encontró una fecha de nacimiento válida en el texto.';
                resultado.style.color = 'red';
            }
        }).catch(err => {
            // Mostrar error si algo sale mal usando la librería
            resultado.innerHTML = 'Hubo un error al procesar la imagen.';
            console.error(err);
        });
    }
});
