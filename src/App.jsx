
import Container from './components/Container/Container';
import { ContactForm } from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

function App() {
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
        
          <h2>Contacts</h2>
          <Filter />
          <ContactList />
        
    </Container>
  );
}

export default App;