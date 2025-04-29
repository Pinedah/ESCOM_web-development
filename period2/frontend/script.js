let temaOscuro = false;
function cambiarTema(){
    temaOscuro = !temaOscuro;

    //document.body.classList.toggle("dark-mode");
    //document.body.classList.toggle("light-mode");
    if (temaOscuro) {
        document.body.classList.add('tema-oscuro');
    } else {
        document.body.classList.remove('tema-oscuro');
    }
}

function mostrarDescripcion(descripcion){
    alert("Has seleccionado: " + descripcion);
}

function mostrarDescripcion(nombrePaisaje) {
    const descripcionElement = document.getElementById('descripcion');
    
    if (nombrePaisaje === 'Paisaje 1') {
        descripcionElement.innerHTML = '<h3>Xolito 1</h3><p>citlaltzin durmiendo</p>';
    } else if (nombrePaisaje === 'Paisaje 2') {
        descripcionElement.innerHTML = '<h3>Xolito 2</h3><p>citlaltzin bebé</p>';
    } else {
        descripcionElement.innerHTML = '<h3>' + nombrePaisaje + '</h3><p>Descripción no disponible.</p>';
    }
}
