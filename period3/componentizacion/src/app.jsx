import React from "react";
import InputComentario from './InputComentario';
import ListaComentarios from './ListaComentarios';

function App() {
    const [comentarios, setComentarios] = React.useState([]);

    const agregarComentario = (nuevo) => {
        setComentarios([...comentarios, {id: Date.now(), texto: nuevo}]);
    };

    const eliminarComentario = (id) => {
        setComentarios(comentarios.filter(c=> c.id !== id));
    };

    return (
        <div>
            <h2>Gestor de comentarios</h2>
            <InputComentario onEnviar={agregarComentario} />
            <ListaComentarios comentarios={comentarios} onEliminar={eliminarComentario} />
        </div>
    );
}
export default App;