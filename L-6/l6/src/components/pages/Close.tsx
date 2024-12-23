import React from 'react';

const ClosePage: React.FC = () => {
    const handleClose = () => {
        window.close();
    };

    return (
        <div>
            <h1>Close Page</h1>
            <button onClick={handleClose}>Close</button>
        </div>
    );
};

export default ClosePage;
