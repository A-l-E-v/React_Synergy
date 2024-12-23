import { useState } from 'react';

const OpenPage = () => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const handleOpen = () => {
        try {
            new URL(url); // Проверка URL
            window.open(url, '_blank');
            setError('');
        } catch {
            setError('Ошибка в URL! Повторите ввод.');
        }
    };

    return (
        <div>
            <h1>Открыть страницу</h1>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Введите URL http(s)://..."
            />
            <button 
            className="btn btn-success"
            onClick={handleOpen}>Открыть!
            </button>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default OpenPage;
