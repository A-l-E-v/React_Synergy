import React, {useState}from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [inputValue, setInputValue] = useState<string>('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
};
const handleButtonClick = () => {
  setInputValue(''); // Очищаем поле ввода
};

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />


        <div>
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleInputChange} 
            />
            <button onClick={handleButtonClick}>
                Очистить
            </button>
        </div>

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
