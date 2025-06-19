import React, { useState, useEffect, memo } from 'react';

// Este es un componente para cada tarjeta individual de contacto
// memo() es como ponerle una "memoria" al componente: solo se vuelve a dibujar
// si cambian sus props (contact o onSelect). Esto evita renders innecesarios
const ContactCard = memo(({ contact, onSelect }) => (
  <div className="contact-card" onClick={() => onSelect(contact.id)}>
    {/* Avatar generado dinámicamente usando el nombre del contacto como "semilla" */}
    {/* Es como crear un avatar único para cada persona basado en su nombre */}
    <div className="contact-avatar">
      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`} alt={contact.name} />
    </div>
    {/* Información básica que se muestra en la tarjeta */}
    <div className="contact-info">
      <h3>{contact.name}</h3>
      <p>{contact.email}</p>
      <p>{contact.company}</p>
    </div>
  </div>
));

// Componente principal que maneja la lista completa de contactos
// También usa memo() para optimizar el rendimiento
const ListaDeContactos = memo(({ searchTerm, onContactSelect }) => {
  // Estado para guardar todos los contactos que obtenemos de la "API"
  const [contacts, setContacts] = useState([]);
  
  // Estado para saber si estamos cargando datos o ya terminamos
  const [loading, setLoading] = useState(true);

  // useEffect se ejecuta cuando el componente se monta (aparece en pantalla)
  // Es como decir "cuando este componente aparezca, ve a buscar los contactos"
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Simulamos una llamada a una API real con un pequeño delay
        // En la vida real, aquí haríamos fetch() a un servidor
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Datos simulados - en una app real vendrían de una base de datos
        // Cada contacto tiene la información básica más el teléfono
        const mockContacts = [
          { id: 1, name: 'Ana García', email: 'ana.garcia@email.com', company: 'Tech Solutions', phone: '+52 55 1234 5678' },
          { id: 2, name: 'Carlos López', email: 'carlos.lopez@email.com', company: 'Digital Marketing', phone: '+52 55 2345 6789' },
          { id: 3, name: 'María Rodríguez', email: 'maria.rodriguez@email.com', company: 'Consulting Group', phone: '+52 55 3456 7890' },
          { id: 4, name: 'Juan Pérez', email: 'juan.perez@email.com', company: 'Software Corp', phone: '+52 55 4567 8901' },
          { id: 5, name: 'Laura Martínez', email: 'laura.martinez@email.com', company: 'Design Studio', phone: '+52 55 5678 9012' },
          { id: 6, name: 'Roberto Silva', email: 'roberto.silva@email.com', company: 'Data Analytics', phone: '+52 55 6789 0123' },
          { id: 7, name: 'Carmen Flores', email: 'carmen.flores@email.com', company: 'Healthcare Inc', phone: '+52 55 7890 1234' },
          { id: 8, name: 'Diego Morales', email: 'diego.morales@email.com', company: 'Finance Plus', phone: '+52 55 8901 2345' }
        ];
        
        // Guardamos los contactos en el estado y marcamos que ya terminamos de cargar
        setContacts(mockContacts);
        setLoading(false);
      } catch (error) {
        // Si algo sale mal, lo registramos en la consola y paramos la carga
        console.error('Error fetching contacts:', error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []); // El array vacío [] significa "solo ejecuta esto una vez al montar el componente"

  // Esta es la magia del filtrado en tiempo real
  // Cada vez que searchTerm cambie, se vuelve a calcular automáticamente
  // Busca coincidencias en nombre, email y empresa (sin importar mayúsculas/minúsculas)
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Si aún estamos cargando, mostramos un mensaje amigable
  if (loading) {
    return <div className="loading">Cargando contactos...</div>;
  }

  return (
    <div className="contacts-container">
      {/* Título que muestra cuántos contactos coinciden con la búsqueda */}
      <h2>Contactos ({filteredContacts.length})</h2>
      
      {/* Grid responsivo que se adapta al tamaño de pantalla */}
      {/* CSS Grid hace que las tarjetas se acomoden automáticamente */}
      <div className="contacts-grid">
        {filteredContacts.map(contact => (
          <ContactCard 
            key={contact.id}  // Clave única para que React sepa qué tarjeta es cuál
            contact={contact} 
            onSelect={onContactSelect}  // Función que se ejecuta al hacer clic
          />
        ))}
      </div>
      
      {/* Mensaje amigable cuando no hay resultados de búsqueda */}
      {filteredContacts.length === 0 && (
        <div className="no-results">
          No se encontraron contactos que coincidan con "{searchTerm}"
        </div>
      )}
    </div>
  );
});

export default ListaDeContactos;
