import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString('RU-ru')); // Время по стандарту локали
    const [interval, setIntervalValue] = useState(1); // Интервал
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null); // Текущий таймер
    const [completedIntervals, setCompletedIntervals] = useState(0); // Количество завершённых интервалов



    const startTimer = () => {
        if (timerId) {
            clearInterval(timerId); // Очищаем предыдущий интервал
        }
        const id = setInterval(async () => {
            setTime(new Date().toLocaleTimeString('RU-ru'));
            await incrementCompletedIntervals(); // Увеличиваем количество завершённых интервалов
        }, interval * 1000);
        setTimerId(id);
    };

    // Асинхронно увеличиваем количество завершённых интервалов
    const incrementCompletedIntervals = async () => {
        setCompletedIntervals(prev => prev + 1);
    };

    const stopTimer = () => {
        if (timerId) {
            clearInterval(timerId); // Останавливаем таймер
            setTimerId(null);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Number(event.target.value)); // Значение не меньше 1
        setIntervalValue(value);
    };

    // Запуск и/или установка интервала
    const handleSetInterval = () => {
        startTimer();
    };

    useEffect(() => {
        return () => {
            if (timerId) {
                clearInterval(timerId); // Очищаем интервал при размонтировании компонента
            }
        };
    }, [timerId]);

    return (
        <div>
            <h2>Текущее время: {time}</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>Интервал в секундах:</span>
                <input
                    type="number"
                    value={interval}
                    onChange={handleInputChange}
                    min="1"
                    style={{ width: '60px', margin: '0 10px' }}
                />
                <button
                    className="btn btn-warning m-2"
                    onClick={handleSetInterval}>Старт/Интервал</button>
                <button
                    className="btn btn-danger m-2"
                    onClick={stopTimer}>Стоп</button>
            </div>
            <h3>Завершённые интервалы: {completedIntervals}</h3>
        </div>
    );
};

export default Timer;
