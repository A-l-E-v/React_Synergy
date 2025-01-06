import { useState } from 'react';
import { Button, Col, Form, Row, Toast } from 'react-bootstrap';
import NameField from './NameField';
import EmailField from './EmailField';
import MessageField from './MessageField';
import ExchangeCalculator from './ExchangeCalculator';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const [toastMessage, setToastMessage] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Проверка обязательных полей
    if (!name || !/[a-zA-Zа-яА-Я]/.test(name)) {
      setToastMessage('Поле "Имя" обязательно и должно содержать хотя бы одну букву.');
      setErrorToast(true);
      setShowToast(true);

      return;
    }
    if (!validateEmail(email)) {
      setToastMessage('Введите корректный адрес электронной почты.');
      setErrorToast(true);
      setShowToast(true);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    try {
      const response = await fetch('YOUR_SERVER_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      // так как эту форму никто не ждёт на этом API, то делаем вид, что отправили по-любому успешно
      if (response.ok) throw new Error('Ошибка отправки формы');
      setToastMessage('Форма успешно отправлена!');
      setErrorToast(false);
      // Очищаем поля после успешной отправки
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setToastMessage(`Ошибка отправки формы: ${error}`);
      setErrorToast(true);
    } finally {
      setShowToast(true);
    }
  };

  return (

    <div>

      <ExchangeCalculator />

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formName">
              <Form.Label>
                Имя <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <NameField value={name} onChange={setName} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formEmail">
              <Form.Label>
                Email <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <EmailField value={email} onChange={setEmail} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formMessage">
              <Form.Label>Сообщение</Form.Label>
              <MessageField value={message} onChange={setMessage} />
            </Form.Group>
          </Col>
        </Row>
        <Button style={{ marginTop: '10px' }} type="submit">Отправить форму</Button>
      </Form>


      <Toast
        // FIXME при закрытии происходит "проскок" противоположного цвета тоста
        onClose={() => {
          setShowToast(false)
          setErrorToast(false)
        }
        }
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: errorToast ? 'red' : 'green', // изменённые стили
          color: 'white'
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ContactForm;
