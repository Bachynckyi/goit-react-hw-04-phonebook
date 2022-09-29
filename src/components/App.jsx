import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from './ContactList/Contactlist'; 
import { useState, useEffect } from "react";
import { Filter } from "./Filter/Filter";

export const App = () => {
  const [ contacts, setContacts] = useState(() => { 
    const savedContact = localStorage.getItem('contacts');
    if (savedContact) {
      const contact = JSON.parse(savedContact);
      return contact;
    }
    return []
  });
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitHandler = data => {
    setContacts(prevState => ([...prevState, data]));
  };

  const filterList = () => {
    const filteredList = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
    return filteredList;
  };

  const handleDeleteContact = contactId => {
    setContacts(prevState => (prevState.filter(contact => contact.id !== contactId)));
  };

  const filterContacts = filter => {
    setFilter(filter);
  };

  const checkName = contacts.map(contact => contact.name);
  
  return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
            color: '#010101'
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <h1 style={{marginTop: '20px', marginBottom: '20px'}}>Phonebook</h1>
            <ContactForm
            onSubmit={onSubmitHandler}
            checkName={checkName}
            />
            <h2 style={{marginTop: '20px', marginBottom: '20px'}}>Contacts</h2>
            <Filter
            filter={filter}
            onFilterChange={filterContacts}
            />
            <ContactList
            data={filterList()}
            onDeleteContact={handleDeleteContact}
            />
          </div>
        </div>
        )
};




