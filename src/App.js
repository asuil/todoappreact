import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

/**
 * Todo Component
 * @param todo: {text: todo content, isDone: true/false depending on todo state}
 * @param index: used to identify this todo
 * @param completeTodo: function to execute when clicking "done"
 * @param removeTodo: function to execute when clicking "delete"
 * @returns individual todo div
 */
function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
      <div className="todo">
        <div style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
          {todo.text}
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={() => completeTodo(index)}>Done!</Button>
          <Button variant="contained" color="primary" onClick={() => removeTodo(index)}>Delete</Button>
        </div>
      </div>
  );
}

/**
 * Input to add a new todo
 * @param addTodo: function to execute on Enter press
 * @returns form with a text input to create a new todo input
 */
function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  // manage ENTER press (if there's content, add to todo-list)
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            className="input"
            value={value}
            onChange={e => setValue(e.target.value)}
        />
      </form>
  );
}

/**
 * Main App
 * @returns Entire App
 */
function App() {
  const [todos, setTodos] = React.useState([
    { text: "Learn about React",
      isDone: false },
    { text: "Meet friend for lunch",
      isDone: false },
    { text: "Build really cool todo app",
      isDone: false }
  ]);

  // add a new todo to the current list
  const addTodo = newTodo => {
    const newTodos = [...todos, {
      text: newTodo,
      isDone: false }];
    setTodos(newTodos);
  };

  // set todo as done
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  // remove todo from current list
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // CssBaseLine for compatibility
  return (
      <React.Fragment>
        <CssBaseline />
        <div className="app">
          <div className="todo-list">
            {todos.map((todo, index) => (
                <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                />
            ))}
            <TodoForm addTodo={addTodo} />
          </div>
        </div>
      </React.Fragment>
  );
}

export default App;