import React, { Component } from 'react';
import Form from './components/Form';
import Section from './components/Section';
import ContactsList from './components/ContactsList';
import Filter from './components/Filter';
import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts !== null) {
      const parsedContacts = JSON.parse(contacts);
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formOnSubmitHandler = data => {
    this.state.contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase(),
    )
      ? alert(`${data.name} is already in contacts.`)
      : this.setState(prevState => ({
          contacts: [
            ...prevState.contacts,
            {
              ...data,
            },
          ],
        }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContact = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const filteredContact = this.getFilteredContact();

    return (
      <div className={s.container}>
        <h1 className={s.title}>Phonebook</h1>
        <Section>
          <Form onSubmit={this.formOnSubmitHandler} />
        </Section>
        <h2 className={s.title_contacts}>Contacts</h2>
        <Section>
          <Filter value={this.state.filter} onChange={this.changeFilter} />
          <ContactsList
            contactsList={filteredContact}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}

export default App;
