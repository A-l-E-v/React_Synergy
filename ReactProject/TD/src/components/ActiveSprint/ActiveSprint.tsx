import SprintBoard from '../SprintBoard/SprintBoard';
import './ActiveSprint.scss';

const ActiveSprint= () => {
    return (
        <div className="active-sprint">
            <h1>Активный спринт</h1>
            <SprintBoard />
        </div>
    );
};

export default ActiveSprint;
