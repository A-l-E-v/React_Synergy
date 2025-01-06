import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { fetchExchangeRate } from '../api';
import CurrencySelector from './CurrencySelector';
import currencies from './Currencies';
import { currencyFlags } from './CurrencyFlags';
import { ArrowLeftRight } from 'react-bootstrap-icons';

const ExchangeCalculator: React.FC = () => {
  const [inAmount, setInAmount] = useState(0);
  const [outAmount, setOutAmount] = useState(0);
  const [inCur, setInCur] = useState('USD');
  const [outCur, setOutCur] = useState('RUB');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        const rate = await fetchExchangeRate(inCur, outCur);
        setExchangeRate(rate);
      } catch (err) {
        const errorMessage = (err as Error).message || 'Неизвестная ошибка';
        setError(`Ошибка получения обменного курса: ${errorMessage}`);
      }
    };

    getExchangeRate();
  }, [inCur, outCur]);

  const handleAmountChange = (value: number, isInputIn: boolean) => {
    if (isInputIn) {
      setInAmount(value);
      setOutAmount(value * exchangeRate);
    } else {
      setOutAmount(value);
      setInAmount(value / exchangeRate);
    }
  };

  const handleCurrencySwap = () => {
    const newInCur = outCur;
    const newOutCur = inCur;
    const newInAmount = outAmount; // Сохраняем текущее значение outAmount
    const newOutAmount = (exchangeRate && exchangeRate !== 0 && !isNaN(exchangeRate))
      ? newInAmount / exchangeRate : 0; // Проверка exchangeRate

    setInCur(newInCur);
    setOutCur(newOutCur);
    setInAmount(newInAmount); // Устанавливаем inAmount равным outAmount
    setOutAmount(newOutAmount); // Устанавливаем outAmount
  };

  const backRate = () => {
    if (exchangeRate && !isNaN(exchangeRate)) {
      return (1 / exchangeRate).toFixed(2);
    } else {
      return (0);
    }
  }

  const justRate = () => {
    if (exchangeRate && !isNaN(exchangeRate)) {
      return (exchangeRate).toFixed(2);
    } else {
      return (0);
    }
  }


  return (
    <div style={{ marginBottom: '50px' }}>

      <Form className="d-flex align-items-center">

        {/* Блок "Продаю" */}
        <div className="exchange-block">
          <h2 className="text-center"
            style={{ fontSize: '1.5rem', fontWeight: '300', marginBottom: '24px' }}>
            Продаю</h2>
          <Form.Group className="d-flex align-items-center">
            <Form.Control
              type="number"
              value={inAmount.toFixed(2)}
              onChange={(e) => handleAmountChange(Number(e.target.value), true)} // Обработка изменения inAmount
              style={{ width: '100px' }}
            />
            <CurrencySelector
              label={currencyFlags[inCur]} // Используем флаг валюты как label
              value={inCur}
              onChange={setInCur}
              currencies={currencies}
              disabledCurrencies={[outCur]}
            />

          </Form.Group>

          <div className="rate-placeholder"
            style={{ marginBottom: '10px', fontSize: '1rem', fontWeight: '200', textAlign: 'start' }}>
            1{inCur}={justRate()}{outCur}</div>
          <div className="terms-placeholder"
            style={{ fontSize: '0.8rem', fontWeight: '300', textAlign: 'start' }}
          >
            <a href="https://currencylayer.com/terms">Terms</a>
          </div>
        </div>

        {/* Кнопка свопа валют */}
        <Button
          style={{ marginLeft: '23px', marginRight: '23px' }}
          onClick={handleCurrencySwap}
          className="swap-button">
          <ArrowLeftRight size={22} />
        </Button>

        {/* Блок "Покупаю" */}
        <div className="exchange-block">
          <h2 className="text-center"
            style={{ fontSize: '1.5rem', fontWeight: '300', marginBottom: '24px' }}>
            Покупаю</h2>


          <Form.Group className="d-flex align-items-center">
            <Form.Control
              type="number"
              value={outAmount.toFixed(2)}
              onChange={(e) => handleAmountChange(Number(e.target.value), false)} // Обработка изменения outAmount
              style={{ width: '100px' }}
            />

            <CurrencySelector
              label={currencyFlags[outCur]} // Используем флаг валюты как label
              value={outCur}
              onChange={setOutCur}
              currencies={currencies}
              disabledCurrencies={[inCur]} // Доступные валюты, исключая выбранную в inCur
            />

          </Form.Group>

          {/* Место для курса и privacy */}
          <div className="rate-placeholder"
            style={{ marginBottom: '10px', fontSize: '1rem', fontWeight: '200', textAlign: 'end' }}>
            1{outCur}={backRate()}{inCur}
          </div>
          <div className="privacy-placeholder"
            style={{ fontSize: '0.8rem', fontWeight: '300', textAlign: 'end' }}
          >
            <a href="https://currencylayer.com/privacy">Privacy</a>
          </div>
        </div>
      </Form>


      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default ExchangeCalculator;
