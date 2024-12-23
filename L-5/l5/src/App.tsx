import { useState } from 'react'
import './App.css'
import './Button.css'; // Импортируйте файл стилей кнопки с заливкой и hover
import './Input.css'; // Импортируйте файл стилей поля ввода для белого цвета шрифта placeholder

import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'

function App() {

  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };


  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonClick = () => {

    setIsClicked(prevCount => !(prevCount)); // меняем флажок на противоположный по нажатия на кнопку
    setInputValue(''); // Очищаем поле ввода

  }

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
          <h4>
            <div>
              <input
                id="inputID1"
                type="text"
                placeholder='Введите текст...'
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                onClick={handleButtonClick}

                className={`button 

                          ${isClicked ? 'green' : 'red'} 
                          ${isHovered ? (isClicked ? 'hover-blue' : 'hover-orange') : ''}`}

                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <strong style={{ color: 'white' }}>Очистить</strong>
              </button>
            </div>
          </h4>
          <h3>
            <p>
              Введите текст в поле выше. Для удаления текста нажмите "Очистить"
            </p>
          </h3>
          <h4>
            <p>
              Начальное и все нечётные состояния фона кнопки - красные. Чётные - зелёные.
            </p>
            <p>
              При hover курсора мышки, фон кнопки меняет свой цвет в зависимости от того:
            </p>
            <p>
              нажата кнопка кнопка нечётное количество раз или ни разу не была ещё нажата (цвет фона кнопки становится оранжевым)
            </p> <p>
              или чётное (цвет фона кнопки становится синим).
            </p>
          </h4>
        </header>
      </div>
    </>
  )
}

export default App
