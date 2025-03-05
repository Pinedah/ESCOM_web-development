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

function searchUser() {
    const boleta = document.getElementById('boleta').value;
    const resultado = document.getElementById('resultado');
    const table = document.getElementById('table');

    if (!boleta) {
        resultado.innerText = 'El campo boleta es obligatorio.';
        resultado.style.color = 'red';
        return;
    }

    fetch(`/usuarios/${boleta}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultado.innerText = 'Usuario no encontrado: ' + data.error;
                resultado.style.color = 'red';
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
            } else {
                resultado.innerText = 'Usuario encontrado';
                resultado.style.color = 'green';
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
                    <tr>
                        <td>${data.nombre}</td>
                        <td>${data.apellido}</td>
                        <td>${data.edad}</td>
                        <td>${data.boleta}</td>
                        <td>${data.correo}</td>
                        <td>${data.phone}</td>
                        <td>${data.domicilio}</td>
                        <td>${data.nombre_usuario}</td>
                        <td>${data.genero}</td>
                    </tr>
                `;
            }
        })
        .catch(error => {
            resultado.innerText = 'Error al buscar usuario.';
            resultado.style.color = 'red';
            console.error('Error:', error);
        });
}

function searchUserForUpdate() {
    const boleta = document.getElementById('boleta').value;
    const resultado = document.getElementById('resultado');

    if (!boleta) {
        resultado.innerText = 'El campo boleta es obligatorio.';
        resultado.style.color = 'red';
        return;
    }

    fetch(`/usuarios/${boleta}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('nombre').value = "";
                document.getElementById('apellido').value = "";
                document.getElementById('edad').value = "";
                document.getElementById('mail').value = "";
                document.getElementById('phone').value = "";
                document.getElementById('domicilio').value = "";
                document.getElementById('nombre_usuario').value = "";
                document.getElementById('genero').value = "";
                resultado.innerText = 'Usuario no encontrado: ' + data.error;
                resultado.style.color = 'red';
            } else {
                resultado.innerText = 'Usuario encontrado';
                resultado.style.color = 'green';
                document.getElementById('nombre').value = data.nombre;
                document.getElementById('apellido').value = data.apellido;
                document.getElementById('edad').value = data.edad;
                document.getElementById('mail').value = data.correo;
                document.getElementById('phone').value = data.phone;
                document.getElementById('domicilio').value = data.domicilio;
                document.getElementById('nombre_usuario').value = data.nombre_usuario;
                document.getElementById('genero').value = data.genero;
            }
        })
        .catch(error => {
            resultado.innerText = 'Error al buscar usuario.';
            resultado.style.color = 'red';
            console.error('Error:', error);
        });
}

function updateUser() {
    const boleta = document.getElementById('boleta').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const correo = document.getElementById('mail').value;
    const phone = document.getElementById('phone').value;
    const domicilio = document.getElementById('domicilio').value;
    const nombre_usuario = document.getElementById('nombre_usuario').value;
    const genero = document.getElementById('genero').value;
    const resultado = document.getElementById('resultado');

    if (!boleta || !nombre || !apellido || !edad || !correo || !phone || !domicilio || !nombre_usuario || !genero) {
        resultado.innerText = 'Todos los campos son obligatorios.';
        resultado.style.color = 'red';
        return;
    }

    fetch(`/usuarios/${boleta}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, edad, correo, phone, domicilio, nombre_usuario, genero })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            resultado.innerText = 'Error al actualizar usuario: ' + data.error;
            resultado.style.color = 'red';
        } else {
            resultado.innerText = 'Usuario actualizado con éxito';
            resultado.style.color = 'green';
        }
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