import { useEffect, useState } from 'react';

const Home = () => {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [dateTime, setDateTime] = useState(new Date().toLocaleString('RU-ru'));
    const userAgent = navigator.userAgent;
    const viewport = `${window.innerWidth} x ${window.innerHeight}`;
    const pixelDensity = `${window.devicePixelRatio} (real: ${window.screen.pixelDepth})`;

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setCoords({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        const interval = setInterval(() => {
            setDateTime(new Date().toLocaleString('RU-ru'));
        }, 1000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <h1>Добро пожаловать на Главную страницу</h1>
            <p>Дата и время: {dateTime}</p>
            <p>User Agent: {userAgent}</p>
            <p>Viewport: {viewport}</p>
            <p>Pixel Density: {pixelDensity}</p>
            <p>Координаты курсора: X: {coords.x}, Y: {coords.y}</p>
        </div>
    );
};

export default Home;
