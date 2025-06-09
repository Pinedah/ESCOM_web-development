function Filtro({onCambiarFiltro}){
    return(
        <select onChange={(e) => onCambiarFiltro(e.target.value)}>
            <option value="">--Todas--</option>
            <option value="paisaje">Paisaje</option>
            <option value="animal">Animal</option>
        </select>
    );
}

export default Filtro;