import {useEffect, useState} from 'react';

function Detalle(){
    const [contenido, setContenido] = useState(null);

    useEffect(()=>{
        const start = performance.now();

        setTimeout(()=>{
            setContenido("Este es un componente pesado cargado con retardo");
            const end = performance.now();
            console.log(`Detalle cargado en ${Math.round(end - start)}ms`);
        }, 5);
    }, []);

    return <p>{contenido || "Preparando contenido..."}</p>;
}

export default Detalle;