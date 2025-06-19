import React, { useState, Suspense } from 'react';
import './App.css';

// Aquí usamos React.lazy() para cargar los componentes solo cuando los necesitemos
// Es como tener una biblioteca donde solo sacas el libro que vas a leer en ese momento
// Esto hace que la aplicación cargue más rápido al inicio
const LazyListaDeContactos = React.lazy(() => import('./components/ListaDeContactos'));
const LazyDetalleContacto = React.lazy(() => import('./components/DetalleContacto'));

function App() {
  // Este estado guarda lo que el usuario escribe en el buscador
  // Cada vez que cambie, se actualizará automáticamente la lista de contactos
  const [searchTerm, setSearchTerm] = useState('');
  
  // Este estado guarda el ID del contacto que el usuario seleccionó para ver detalles
  // Si es null, significa que no hay ningún contacto seleccionado
  const [selectedContactId, setSelectedContactId] = useState(null);

  // Esta función se ejecuta cuando el usuario hace clic en un contacto
  // Recibe el ID del contacto y lo guarda en el estado para mostrar sus detalles
  const handleContactSelect = (contactId) => {
    setSelectedContactId(contactId);
  };

  // Esta función cierra el modal de detalles del contacto
  // Simplemente pone el selectedContactId de vuelta a null
  const handleCloseDetail = () => {
    setSelectedContactId(null);
  };

  return (
    <div className="app">
      {/* Header principal con el título y el buscador */}
      <header className="app-header">
        <h1>CRM de Contactos Inteligente</h1>
        <div className="search-container">
          {/* Input de búsqueda que se conecta directamente con el estado */}
          {/* Cada vez que el usuario escriba algo, se actualiza searchTerm */}
          <input
            type="text"
            placeholder="Buscar contactos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      <main className="app-main">
        {/* Suspense es como un "mientras tanto..." para cuando un componente se está cargando */}
        {/* Si ListaDeContactos aún no se ha cargado, muestra el mensaje de "Cargando contactos..." */}
        <Suspense fallback={<div className="loading">Cargando contactos...</div>}>
          <LazyListaDeContactos 
            searchTerm={searchTerm}  // Le pasamos el término de búsqueda
            onContactSelect={handleContactSelect}  // Le pasamos la función para seleccionar contactos
          />
        </Suspense>

        {/* Solo mostramos el detalle del contacto si hay uno seleccionado */}
        {/* Es como una ventana emergente que aparece solo cuando la necesitamos */}
        {selectedContactId && (
          <Suspense fallback={<div className="loading">Cargando detalles...</div>}>
            <LazyDetalleContacto 
              contactId={selectedContactId}  // Le decimos cuál contacto mostrar
              onClose={handleCloseDetail}    // Le damos la función para cerrar el modal
            />
          </Suspense>
        )}
      </main>
    </div>
  );
}

export default App;
