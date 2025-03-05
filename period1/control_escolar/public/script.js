function main() {
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const boleta = document.getElementById('boleta').value;
    const correo = document.getElementById('mail').value;
    const phone = document.getElementById('phone').value;
    const domicilio = document.getElementById('domicilio').value;
    const nombre_usuario = document.getElementById('nombre_usuario').value;
    const genero = document.getElementById('genero').value;
    const resultado = document.getElementById('resultado');

    // Verificar que no haya campos vacíos
    if (!nombre || !apellido || !edad || !boleta || !correo || !phone || !domicilio || !nombre_usuario || !genero) {
        resultado.innerText = 'Todos los campos son obligatorios.';
        resultado.style.color = 'red';
        return;
    }

    // Enviar datos al servidor
    fetch('/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, edad, boleta, correo, phone, domicilio, nombre_usuario, genero })
    })
    .then(response => response.json())
    .then(data => {
        resultado.innerText = 'Usuario registrado con éxito';
        resultado.style.color = 'green';
    })
    .catch(error => {
        resultado.innerText = 'Error al registrar usuario.';
        resultado.style.color = 'red';
        console.error('Error:', error);
    });
}

function read(){
    fetch('/usuarios')
    .then(response => response.json())
    .then(data => {
        let table = document.getElementById('table');
        table.innerHTML = `
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Edad</th>
                <th>Boleta</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Domicilio</th>
                <th>Nombre de usuario</th>
                <th>Genero</th>
            </tr>
        `;
        data.forEach(usuario => {
            table.innerHTML += `
                <tr>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.edad}</td>
                    <td>${usuario.boleta}</td>
                    <td>${usuario.correo}</td>
                    <td>${usuario.phone}</td>
                    <td>${usuario.domicilio}</td>
                    <td>${usuario.nombre_usuario}</td>
                    <td>${usuario.genero}</td>
                </tr>
            `;
        });
    })
    .catch(error => console.error('Error:', error));
}

function update(){
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const boleta = document.getElementById('boleta').value;
    const correo = document.getElementById('mail').value;
    const phone = document.getElementById('phone').value;
    const domicilio = document.getElementById('domicilio').value;
    const nombre_usuario = document.getElementById('nombre_usuario').value;
    const genero = document.getElementById('genero').value;
    const resultado = document.getElementById('resultado');

    if (!id || !nombre || !apellido || !edad || !boleta || !correo || !phone || !domicilio || !nombre_usuario || !genero) {
        resultado.innerText = 'Todos los campos son obligatorios.';
        resultado.style.color = 'red';
        return;
    }

    fetch(`/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, edad, boleta, correo, phone, domicilio, nombre_usuario, genero })
    })
    .then(response => response.json())
    .then(data => {
        resultado.innerText = 'Usuario actualizado con éxito';
        resultado.style.color = 'green';
    })
    .catch(error => {
        resultado.innerText = 'Error al actualizar usuario.';
        resultado.style.color = 'red';
        console.error('Error:', error);
    });
}

function deleteUser() {
    const boleta = document.getElementById('boleta').value;
    const resultado = document.getElementById('resultado');

    if (!boleta) {
        resultado.innerText = 'El campo boleta es obligatorio.';
        resultado.style.color = 'red';
        return;
    }

    fetch(`/usuarios/${boleta}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            resultado.innerText = 'Error al eliminar usuario: ' + data.error;
            resultado.style.color = 'red';
        } else {
            resultado.innerText = 'Usuario eliminado con éxito';
            resultado.style.color = 'green';
        }
    })
    .catch(error => {
        resultado.innerText = 'Error al eliminar usuario.';
        resultado.style.color = 'red';
        console.error('Error:', error);
    });
}