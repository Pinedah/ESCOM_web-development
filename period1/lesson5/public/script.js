function main() {
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const boleta = document.getElementById('boleta').value;
    const correo = document.getElementById('mail').value;
    const domicilio = document.getElementById('domicilio').value;
    const resultado = document.getElementById('resultado');

    // Verificar que no haya campos vacíos
    if (!nombre || !apellido || !edad || !boleta || !correo || !domicilio) {
        resultado.innerText = 'Todos los campos son obligatorios.';
        resultado.style.color = 'red';
        return;
    }

    // Enviar datos al servidor
    fetch('/agregar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, edad, boleta, correo, domicilio })
    })
    .then(response => response.json())
    .then(data => {
        resultado.innerText = data.mensaje;
        resultado.style.color = 'green';
    })
    .catch(error => {
        resultado.innerText = 'Error al registrar usuario.';
        resultado.style.color = 'red';
        console.error('Error:', error);
    });
}
