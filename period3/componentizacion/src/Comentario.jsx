function Comentario({ texto, id, onEliminar }) {
    return (
        <li>
            {texto}
            <button onClick={() => onEliminar(id)}>Eliminar</button>
        </li>
    );
}

export default Comentario;