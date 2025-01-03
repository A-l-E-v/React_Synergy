import { useState, forwardRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Todo } from './TodoList';

interface AddTodoModalProps {
  show: boolean;
  onHide: () => void;
  onAdd: (title: string) => void;
  editingTodo: Todo | null; // Функция редактирования
}

const AddTodoModal = forwardRef<HTMLDivElement, AddTodoModalProps>(({ show, onHide, onAdd, editingTodo }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title); // Заполнение поля при редактировании
    } else {
      setTitle('');
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{editingTodo ? 'Редактировать задачу' : 'Добавить задачу'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasic">
            <Form.Label>Название задачи:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ marginBottom: '12px' }}
            />
          </Form.Group>
          <Button variant="secondary" onClick={onHide}>
            Отмена
          </Button>
          <Button
            style={{ marginLeft: '12px' }}
            variant="primary" type="submit">
            {editingTodo ? 'Сохранить' : 'Добавить'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
});

export default AddTodoModal;
