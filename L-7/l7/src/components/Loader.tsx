import { Spinner } from 'react-bootstrap';

const Loader = () => (
    <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p>Загрузка...</p>
    </div>
);

export default Loader;
