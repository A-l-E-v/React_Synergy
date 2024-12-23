import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [dateTime, setDateTime] = useState(new Date().toLocaleString());
    const userAgent = navigator.userAgent;
    const viewport = `${window.innerWidth} x ${window.innerHeight}`;
    const pixelDensity = `${window.devicePixelRatio} (real: ${window.screen.pixelDepth})`;

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setCoords({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        const interval = setInterval(() => {
            setDateTime(new Date().toLocaleString());
        }, 1000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>Date and Time: {dateTime}</p>
            <p>User Agent: {userAgent}</p>
            <p>Viewport: {viewport}</p>
            <p>Pixel Density: {pixelDensity}</p>
            <p>Mouse Coordinates: X: {coords.x}, Y: {coords.y}</p>
        </div>
    );
};

export default Home;
