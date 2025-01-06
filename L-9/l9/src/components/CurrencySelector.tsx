import { Form } from 'react-bootstrap';

interface CurrencySelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currencies: string[];
  disabledCurrencies: string[];
}

const CurrencySelector: React.FC<CurrencySelectorProps> =
  ({ label, value, onChange, currencies, disabledCurrencies }) => {
    return (
      <Form.Group className="currency-selector-group">
        <Form.Control as="select" value={value} onChange={(e) => onChange(e.target.value)}>
          {/* Фильтрация выбранной в другом блоке валюты */}
          {currencies
            .filter(currency => !disabledCurrencies.includes(currency))
            .map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
        </Form.Control>
        <Form.Label>{label}</Form.Label>
      </Form.Group>
    );
  };

export default CurrencySelector;