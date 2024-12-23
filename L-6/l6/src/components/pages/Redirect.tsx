import React from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Домой!</h1>
            <button
            className="btn btn-primary"
            onClick={() => navigate('/')}>
                На главную страницу!</button>
            <h1>Redirect Page</h1>
        </div>
    );
};

export default RedirectPage;
