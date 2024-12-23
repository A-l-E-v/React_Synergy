
const ClosePage = () => {
    const handleClose = () => {
        window.close();
    };

    return (
        <div>
            <h1>Закрыть страницу</h1>
            <button className="btn btn-danger" onClick={handleClose}>Закроет эту страницу!</button>
        </div>
    );
};

export default ClosePage;
