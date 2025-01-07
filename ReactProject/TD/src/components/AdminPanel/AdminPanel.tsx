import TaskForm from '../TaskForm/TaskForm';
import UserForm from '../UserForm/UserForm';
import './AdminPanel.scss';

const AdminPanel = () => {
    return (
        <div className="admin-panel">
            <h1>Панель администратора</h1>
            <TaskForm />
            <UserForm />
            <h1>Панель администратора</h1>
            <TaskForm />
            <UserForm />
            <h1>Панель администратора</h1>
            <TaskForm />
            <UserForm />
            <h1>Панель администратора</h1>
            <TaskForm />
            <UserForm />
            <h1>Панель администратора</h1>
            <TaskForm />
            <UserForm />
            <h1>Панель администратора</h1>
            <TaskForm />
            <UserForm />
        </div>
    );
};

export default AdminPanel;
