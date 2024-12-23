import React from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Redirect Page</h1>
            <button onClick={() => navigate('/')}>Redirect to Home</button>
        </div>
    );
};

export default RedirectPage;
