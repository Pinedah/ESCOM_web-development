import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx'; // Agregar la extensión .jsx al importar

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
