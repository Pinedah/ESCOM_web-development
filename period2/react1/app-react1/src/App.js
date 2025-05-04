import React, {useState} from 'react';

function FormularioContacto(){
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [enviado, setEnviado] = useState(false);

    const manejarEnvio = (e) => {
        e.preventDefault(); // evita que recargue la pagina
        setEnviado(true);
    };
    
    return (
        <div>
            <h2>Contactanos</h2>
            {!enviado ? (
                <form onSubmit={manejarEnvio}>
                    <label>
                        Nombre:
                        <input type='text' value={nombre} onChange={(e)=>setNombre(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Mensaje:
                        <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)}></textarea>
                    </label>
                    <button type='submit' disabled={nombre.trim() === ''}>Enviar</button>

                </form>
            ):(
                <p>Gracias, {nombre}. Tu mensaje fue enviado con exito.</p>
            )}
        </div>
    );
}

export default FormularioContacto;