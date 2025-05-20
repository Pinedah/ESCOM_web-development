import {useState} from 'react';

function InputComentario({onEnviar}) {
    const [texto, setTexto] = useState('');

    const manejarEnvio = () => {
        if (texto.trim() !== '') {
            onEnviar(texto);
            setTexto('');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Escribe un comentario..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />
            <button onClick={manejarEnvio}>Agregar</button>
        </div>
    );
}
export default InputComentario;