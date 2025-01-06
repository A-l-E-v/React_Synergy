import { Form } from 'react-bootstrap';

interface NameFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const NameField: React.FC<NameFieldProps> = ({ value, onChange }) => {
  return (
    <Form.Group controlId="formName">
      <Form.Control
        type="text"
        placeholder="Имя"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ height: '50px' }}

      />
    </Form.Group>
  );
};

export default NameField;
