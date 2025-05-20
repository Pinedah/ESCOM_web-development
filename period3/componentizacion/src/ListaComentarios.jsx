import Comentario from './Comentario';

function ListaComentarios({ comentarios, onEliminar }) {
    return (
        <ul>
            {comentarios.map((c) => (
                <Comentario
                    key={c.id}
                    texto={c.texto}
                    id={c.id}
                    onEliminar={onEliminar}
                />
            ))}
        </ul>
    );
}
export default ListaComentarios;