import { Form } from 'react-bootstrap';

interface MessageFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const MessageField: React.FC<MessageFieldProps> = ({ value, onChange }) => {
  return (
    <Form.Group controlId="formMessage">
      <Form.Control
        as="textarea"
        rows={3}
        placeholder="Сообщение"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          height: '50px', display: 'flex',
          alignItems: 'center',
          padding: '0.7rem'
        }}

      />
    </Form.Group>
  );
};

export default MessageField;
