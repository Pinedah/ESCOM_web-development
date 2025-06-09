// Componente Pesado

import React, {useEffect, useState} from 'react';

function ComponentePesado(){
    const [data, setData] = useState(null);
    useEffect(()=>{
        setTimeout(()=>{
            setData("Datos cargados luego de un retardo simulado");
        }, 2000);
    }, []);

    return(
        <div>
            <h2>Componente Pesado</h2>
            <p>{data || "Cargando Datos..."}</p>
        </div>
    );
}

export default ComponentePesado;