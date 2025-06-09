// App.jsx

import React, {Suspense, useState, memo} from 'react';
const ComponentePesado = React.lazy(()=>import('./ComponentePesado'));

const Contador = memo(({contador})=>{
    console.log("Render contador");
    return <p>Valor actual:{contador}</p>;
});

function App(){
    const [mostrar, setMostrar] = useState(false);
    const [contador, setContador] = useState(0);

    return(
        <div>
            <h1>Performance y recursos</h1>
            <button onClick={()=>setContador(contador+1)}>Incrementar</button>
            <Contador contador={contador}/>
            <button onClick={()=>setMostrar(!mostrar)}>
                {mostrar ? "Ocultar" : "Mostrar"} Componente Pesado
            </button>
            {mostrar && (
                <Suspense fallback={<div>Cargando...</div>}>
                    <ComponentePesado/>
                </Suspense>
            )}
            <img
                src='https://via.placeholder.com/800x400'
                alt='Imagen de prueba'
                loading='lazy'
                width='800'
            />
        </div>
    );
}

export default App;