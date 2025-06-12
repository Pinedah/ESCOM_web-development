import React, { useState, Suspense } from 'react';
import './App.css';

const LazyListaDeContactos = React.lazy(() => import('./components/ListaDeContactos'));
const LazyDetalleContacto = React.lazy(() => import('./components/DetalleContacto'));

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContactId, setSelectedContactId] = useState(null);

  const handleContactSelect = (contactId) => {
    setSelectedContactId(contactId);
  };

  const handleCloseDetail = () => {
    setSelectedContactId(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>CRM de Contactos Inteligente</h1>
        <div className="search-container">
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
        <Suspense fallback={<div className="loading">Cargando contactos...</div>}>
          <LazyListaDeContactos 
            searchTerm={searchTerm}
            onContactSelect={handleContactSelect}
          />
        </Suspense>

        {selectedContactId && (
          <Suspense fallback={<div className="loading">Cargando detalles...</div>}>
            <LazyDetalleContacto 
              contactId={selectedContactId}
              onClose={handleCloseDetail}
            />
          </Suspense>
        )}
      </main>
    </div>
  );
}

export default App;
