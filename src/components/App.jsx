import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from './ContactList/Contactlist'; 
import { Component } from "react";
import { Filter } from "./Filter/Filter";



export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const savedContact = localStorage.getItem('contacts');
    const contact = JSON.parse(savedContact);

    if (contact) {
      this.setState({ contacts: contact });
    }
  }

  onSubmitHandler = data => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, data],
    }));
  };

  filterContacts = filter => {
    this.setState({ filter: filter });
  };

  filterList = () => {
    const filteredList = this.state.contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return filteredList;
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const { contacts } = this.state;
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
        onSubmit={this.onSubmitHandler}
        checkName={checkName}/>
        <h2 style={{marginTop: '20px', marginBottom: '20px'}}>Contacts</h2>
        <Filter
        filter={this.state.filter}
        onFilterChange={this.filterContacts}/>
        <ContactList
        data={this.filterList()}
        onDeleteContact={this.handleDeleteContact}
        />
      </div>
    </div>
  )};
}
