import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

function App() {

  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setInputValue(''); // Очищаем поле ввода
  };

  return (
    <>
      <div>

        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>

        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>

      </div>

      <h1>Vite + React</h1>

      <div className="App">
        <header className="App-header">

          <div>
            <input
              type="text"
              placeholder='Введите текст...'
              value={inputValue}
              onChange={handleInputChange}
            />
            <button onClick={handleButtonClick}>
              Очистить
            </button>
          </div>

          <p>
            Введите текст в поле выше. Для удаления текста нажмите "Очистить"
          </p>

        </header>
      </div>
    </>
  )
}

export default App
