
import { useState } from 'react';
import TodoList from './components/TodoList';
import './styles/styles.scss';

const App = () => {
  const [todos, setTodos] = useState<{ title: string; completed: boolean }[]>([]);

  return (
    <div className="App">
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;