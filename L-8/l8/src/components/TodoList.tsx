import { useState, useMemo, useCallback, useRef } from 'react';
import { Button, ListGroup, Form } from 'react-bootstrap';
import AddTodoModal from './AddTodoModal';

export interface Todo {
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Обработчик для добавления или редактирования задачи
  const handleSaveTodo = useCallback((title: string) => {
    if (editingIndex !== null) {

      // Редактирование существующей задачи
      setTodos(prevTodos => {
        const updatedTodos = [...prevTodos];

        // Сохраняем текущее название
        const currentTitle = updatedTodos[editingIndex].title;
        updatedTodos[editingIndex] = {
          ...updatedTodos[editingIndex],
          title,

          // Обновляем completed
          completed: currentTitle !== title ? false : updatedTodos[editingIndex].completed
        };
        return updatedTodos;
      });
    } else {

      // Добавление новой задачи
      setTodos(prevTodos => [{ title, completed: false }, ...prevTodos]);
    }
    // Закрыть модальное окно после добавления/редактирования
    setShowModal(false);

    // Сбросить индекс редактирования
    setEditingIndex(null);
  }, [editingIndex, setTodos]);


  // Обработчик для удаления задачи
  const handleDelete = useCallback((index: number) => {
    setTodos(prevTodos => prevTodos.filter((_, i) => i !== index));
  }, [setTodos]);


  // Обработчик для изменения статуса задачи
  const handleToggleComplete = useCallback((index: number) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map((todo, i) =>
        
        // Переключение статуса
        i === index ? { ...todo, completed: !todo.completed } : todo
      );
      return updatedTodos;
    });
  }, [setTodos]);

  // Оптимизация списка задач с помощью useMemo
  const memorizedTodos = useMemo(() => {
    return todos.map((todo, index) => (
      <ListGroup.Item key={index} className={todo.completed ? 'completed' : ''}>
        <Form.Check
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggleComplete(index)}
          label={
            <span
              // Клик по названию задачи
              onClick={() => handleToggleComplete(index)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#6c757d' : 'black'
              }}
            >
              {todo.title}
            </span>
          }
          style={{ cursor: 'pointer' }} // Указатель на чекбокс
        />
        <Button variant="warning"
          className="todo-button"
          onClick={() => { setEditingIndex(index); setShowModal(true); }}>
          Редактировать</Button>
        <Button variant="danger"
          className="todo-button"
          onClick={() => handleDelete(index)}>
          Удалить</Button>
      </ListGroup.Item>
    ));
  }, [handleDelete, handleToggleComplete, todos]);

  return (
    <div style={{ padding: '10px' }}>
      <h1 className="todo-title">Список задач</h1>
      <Button style={{ marginBottom: 10 }}
        onClick={() => { setEditingIndex(null); setShowModal(true); }}>
        Добавить задачу</Button>
      <ListGroup>{memorizedTodos}</ListGroup>
      <AddTodoModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onAdd={handleSaveTodo}
        editingTodo={editingIndex !== null ? todos[editingIndex] : null}
        ref={modalRef}
      />
    </div>
  );
};

export default TodoList;
