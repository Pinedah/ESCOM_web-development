import React, {Suspense, useState} from 'react';

const Galeria = React.lazy(() => import('./components/Galeria'));
const Detalle = React.lazy(() => import('./components/Detalle'));

function App(){
    const[vista, setVista] = useState('galeria');

    return(
        <div>
            <h1>Portal de Medios</h1>
            <button onClick={()=>setVista('galeria')}>Galeria</button>
            <button onClick={()=>setVista('detalle')}>Detalle</button>
        
            <Suspense fallback={<p>Cargando componente...</p>}>
                {vista === 'galeria' ? <Galeria /> : <Detalle />}
            </Suspense>
        </div>
    );
}

export default App;