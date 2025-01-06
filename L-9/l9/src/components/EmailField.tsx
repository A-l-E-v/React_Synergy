import { Form } from 'react-bootstrap';

interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const EmailField: React.FC<EmailFieldProps> = ({ value, onChange }) => {
  return (
    <Form.Group controlId="formEmail">
      <Form.Control
        type="email"
        placeholder="Email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ height: '50px' }}

      />
    </Form.Group>
  );
};

export default EmailField;
