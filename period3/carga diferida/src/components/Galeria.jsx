import {useState} from 'react';
import Filtro from './Filtro';

const imagenes = [
    {id: 1, url: '/home/pineda/GitHub/ESCOM_web-development/period3/carga diferida/img/Citlaltzin_003.jpeg', categoria: 'paisaje'},
    {id: 2, url: 'https://via.placeholder.com/300x200', categoria: 'animal'},
    {id: 3, url: 'https://via.placeholder.com/300x200', categoria: 'paisaje'}
];

function Galeria(){
    const [filtro, setFiltro] = useState('');
    
    const filtradas = filtro ? imagenes.filter(img => img.categoria === filtro) : imagenes;

    return(
        <div>
            <h2>Galeria de imagenes</h2>
            <Filtro onCambiarFiltro={setFiltro}/>
            <div style={{display:'flex', gap:'10px'}}>
                {filtradas.map(img=>(
                    <img
                    key={img.id}
                    src={img.url}
                    alt="Imagennn"
                    loading="lazy"
                    width="300"
                    height="200"
                    />
                ))}
            </div>
        </div>
    );
}

export default Galeria;