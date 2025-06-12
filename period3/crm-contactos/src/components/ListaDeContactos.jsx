import React, { useState, useEffect, memo } from 'react';

const ContactCard = memo(({ contact, onSelect }) => (
  <div className="contact-card" onClick={() => onSelect(contact.id)}>
    <div className="contact-avatar">
      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`} alt={contact.name} />
    </div>
    <div className="contact-info">
      <h3>{contact.name}</h3>
      <p>{contact.email}</p>
      <p>{contact.company}</p>
    </div>
  </div>
));

const ListaDeContactos = memo(({ searchTerm, onContactSelect }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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
        
        setContacts(mockContacts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Cargando contactos...</div>;
  }

  return (
    <div className="contacts-container">
      <h2>Contactos ({filteredContacts.length})</h2>
      <div className="contacts-grid">
        {filteredContacts.map(contact => (
          <ContactCard 
            key={contact.id} 
            contact={contact} 
            onSelect={onContactSelect}
          />
        ))}
      </div>
      {filteredContacts.length === 0 && (
        <div className="no-results">
          No se encontraron contactos que coincidan con "{searchTerm}"
        </div>
      )}
    </div>
  );
});

export default ListaDeContactos;
