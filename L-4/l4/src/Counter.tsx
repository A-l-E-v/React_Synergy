import { useState, useEffect } from 'react';

const Counter = () => {
    const [count, setCount] = useState<number>(0); //Состояние счетчика

    const increment = () => setCount(count + 1); //Увеличение счетчика
    const decrement = () => setCount(count - 1); //Уменьшение счетчика

    const handleKeyboard = (event: KeyboardEvent) => {
        event.preventDefault(); // чтобы после пробела, счётчик не становился в -1
        switch (event.key) {
            case 'ArrowUp': // курсор вверх - увеличиваем счётчик
                setCount(prevCount => prevCount + 1);
                break;
            case 'ArrowDown': // курсор вниз - уменьшаем
                setCount(prevCount => prevCount - 1);
                break;
            case ' ': // пробелом - сбрасываем
                setCount(prevCount => prevCount = 0);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyboard);
        return () => {
            window.removeEventListener('keydown', handleKeyboard);
        };
    }, []);


    return (
        <div>
            <div>
                <h2>Счетчик: {count}</h2>
                <button
                    className="btn btn-danger m-2"

                    // стилизация кнопки - радиус скругления и тень
                    style={{
                        borderRadius: '5px',
                        boxShadow: '2px 2px 5px rgba(0,0,0,0.5)'
                    }}

                    // при наведение мышкой на кнопку, фон кнопки светлеет
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'red')}
                    // при отведении курсора мышки фон становится прежним
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}

                    onClick={decrement}>Уменьшить</button>

                <button
                    className="btn btn-success m-2"

                    // стилизация кнопки - радиус скругления и тень
                    style={{
                        borderRadius: '5px',
                        boxShadow: '2px 2px 5px rgba(0,0,0,0.5)'
                    }}

                    // при наведение мышкой на кнопку, фон кнопки светлеет
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#5ced73')}
                    // при отведении курсора мышки фон становится прежним
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}

                    onClick={increment}>Увеличить</button>
            </div>

            <span>
                Стрелки вверх, вниз - увеличение и уменьшение счётчика.
            </span>
            <p>
                Пробел - сброс счётчика.
            </p>
        </div>
    );
};

export default Counter;
