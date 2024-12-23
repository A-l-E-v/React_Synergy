import React, { useState } from 'react';

const OpenPage: React.FC = () => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const handleOpen = () => {
        try {
            new URL(url); // Проверка URL
            window.open(url, '_blank');
            setError('');
        } catch {
            setError('Invalid URL. Please check and try again.');
        }
    };

    return (
        <div>
            <h1>Open Page</h1>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
            />
            <button onClick={handleOpen}>Open</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default OpenPage;
