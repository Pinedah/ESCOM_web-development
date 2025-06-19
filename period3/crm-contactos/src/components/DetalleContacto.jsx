import React, { useState, useEffect, memo } from 'react';

// Este componente es como una ventana emergente (modal) que muestra información detallada
// de un contacto específico. Solo aparece cuando el usuario hace clic en una tarjeta
const DetalleContacto = memo(({ contactId, onClose }) => {
  // Estado para guardar la información completa del contacto seleccionado
  const [contact, setContact] = useState(null);
  
  // Estado para saber si estamos cargando la información detallada
  const [loading, setLoading] = useState(true);

  // Este useEffect se ejecuta cada vez que cambia el contactId
  // Es como decir "cuando me pidan mostrar un contacto diferente, ve a buscar sus detalles"
  useEffect(() => {
    const fetchContactDetail = async () => {
      try {
        setLoading(true);
        
        // Simulamos otro llamado a la API, esta vez para obtener información más detallada
        // En una app real, esto podría ser una llamada separada que trae más datos
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Base de datos simulada con información extendida de cada contacto
        // Aquí tenemos datos adicionales como puesto, departamento y notas
        const mockDetailedContacts = {
          1: { id: 1, name: 'Ana García', email: 'ana.garcia@email.com', company: 'Tech Solutions', phone: '+52 55 1234 5678', position: 'Frontend Developer', department: 'Engineering', notes: 'Especialista en React y Vue.js' },
          2: { id: 2, name: 'Carlos López', email: 'carlos.lopez@email.com', company: 'Digital Marketing', phone: '+52 55 2345 6789', position: 'Marketing Manager', department: 'Marketing', notes: 'Experto en estrategias digitales' },
          3: { id: 3, name: 'María Rodríguez', email: 'maria.rodriguez@email.com', company: 'Consulting Group', phone: '+52 55 3456 7890', position: 'Business Consultant', department: 'Strategy', notes: 'Consultora senior con 10 años de experiencia' },
          4: { id: 4, name: 'Juan Pérez', email: 'juan.perez@email.com', company: 'Software Corp', phone: '+52 55 4567 8901', position: 'Full Stack Developer', department: 'Engineering', notes: 'Desarrollador con experiencia en Node.js y Python' },
          5: { id: 5, name: 'Laura Martínez', email: 'laura.martinez@email.com', company: 'Design Studio', phone: '+52 55 5678 9012', position: 'UX Designer', department: 'Design', notes: 'Diseñadora especializada en experiencia de usuario' },
          6: { id: 6, name: 'Roberto Silva', email: 'roberto.silva@email.com', company: 'Data Analytics', phone: '+52 55 6789 0123', position: 'Data Scientist', department: 'Analytics', notes: 'Experto en machine learning y big data' },
          7: { id: 7, name: 'Carmen Flores', email: 'carmen.flores@email.com', company: 'Healthcare Inc', phone: '+52 55 7890 1234', position: 'Project Manager', department: 'Operations', notes: 'Gestora de proyectos en el sector salud' },
          8: { id: 8, name: 'Diego Morales', email: 'diego.morales@email.com', company: 'Finance Plus', phone: '+52 55 8901 2345', position: 'Financial Analyst', department: 'Finance', notes: 'Analista financiero con certificación CFA' }
        };
        
        // Buscamos el contacto específico usando el ID que nos pasaron
        setContact(mockDetailedContacts[contactId]);
        setLoading(false);
      } catch (error) {
        // Si algo sale mal, lo registramos y paramos la carga
        console.error('Error fetching contact detail:', error);
        setLoading(false);
      }
    };

    fetchContactDetail();
  }, [contactId]); // Se ejecuta cada vez que cambia el contactId

  // Pantalla de carga mientras obtenemos la información
  if (loading) {
    return (
      <div className="detail-overlay">
        <div className="detail-modal">
          <div className="loading">Cargando detalles del contacto...</div>
        </div>
      </div>
    );
  }

  // Si por alguna razón no encontramos el contacto, mostramos un error amigable
  if (!contact) {
    return (
      <div className="detail-overlay">
        <div className="detail-modal">
          <div className="error">Contacto no encontrado</div>
          <button onClick={onClose} className="close-btn">Cerrar</button>
        </div>
      </div>
    );
  }

  return (
    // El overlay es el fondo oscuro que cubre toda la pantalla
    // Si hacen clic en él (fuera del modal), se cierra automáticamente
    <div className="detail-overlay" onClick={onClose}>
      {/* El modal es la ventana blanca con la información */}
      {/* stopPropagation() evita que el clic en el modal cierre la ventana */}
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Botón X para cerrar el modal */}
        <button className="close-btn" onClick={onClose}>×</button>
        
        {/* Cabecera del modal con avatar grande y información básica */}
        <div className="detail-header">
          <div className="detail-avatar">
            {/* Avatar más grande que en las tarjetas */}
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`} alt={contact.name} />
          </div>
          <div className="detail-basic-info">
            <h2>{contact.name}</h2>
            <p className="position">{contact.position}</p>
            <p className="company">{contact.company}</p>
          </div>
        </div>

        {/* Contenido principal con información detallada */}
        <div className="detail-content">
          {/* Sección de información de contacto */}
          <div className="detail-section">
            <h3>Información de Contacto</h3>
            {/* Cada fila muestra una etiqueta y su valor correspondiente */}
            <div className="detail-row">
              <span className="label">Email:</span>
              <span className="value">{contact.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Teléfono:</span>
              <span className="value">{contact.phone}</span>
            </div>
            <div className="detail-row">
              <span className="label">Departamento:</span>
              <span className="value">{contact.department}</span>
            </div>
          </div>

          {/* Sección de notas adicionales */}
          <div className="detail-section">
            <h3>Notas</h3>
            <p>{contact.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DetalleContacto;
