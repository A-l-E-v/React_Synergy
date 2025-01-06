import './App.scss'

import { Container } from 'react-bootstrap';
import ContactForm from './components/ContactForm';


const App: React.FC = () => {
  return (
    <Container style={{ width: '530px' }}>
      <h1 className="text-center" style={{ marginBottom: '30px' }}>Обмен валют</h1>
      <ContactForm />
    </Container>
  );
};

export default App
