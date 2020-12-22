import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Todo from './components/Todo';

// back-end connection imports
import { useEffect } from 'react';
import axios from 'axios';


// material-ui/core styles
const useStyles = makeStyles({
  cardcontainer: {
    padding: '2rem 10rem',
  },
  inputcard: {
    padding: '20px',
  },
  buttoncontainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
});


/**
 * Input to add a new todo
 * @param addTodo: function to execute on Enter press
 * @returns form with a text input to create a new todo input
 */
function TodoForm({ addTodo }) {

  // global styles
  const classes = useStyles();

  const [value, setValue] = React.useState("");
  const [desc, setDesc] = React.useState("");

  // manage ENTER press (if there's content, add to todo-list)
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    // desc can be empty
    addTodo({
        title: value,
        desc: desc,
        done: false,
    });
    setValue("");
    setDesc("");
  };

  return (
      <Grid item xs={6}>
        <Card className={classes.inputcard}>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={4}>
                <TextField
                    id="standard-basic"
                    label="Title"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                    id="standard-basic"
                    label="Description"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} className={classes.buttoncontainer}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
  );
}


/**
 * Main App
 * @returns Entire App
 */
function App() {

  // global styles
  const classes = useStyles();

  const [todos, setTodos] = React.useState([
    { title: "No to-dos found",
      desc: "Create a to-do to display here",
      done: false }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
          "/api/v1/todos",
      );
      setTodos(result.data);
    };
    fetchData();
  }, []);

  // add a new todo to the current list
  const addTodo = newTodo => {
      axios.post('/api/v1/todos', newTodo)
          .then(r => setTodos([...todos, r.data]));
  };

  // set todo as done
  const completeTodo = todoData => {
      axios.put(`/api/v1/todos/${todoData.id}`, {todo: {done: true}})
          .then(r => {
              const newTodos = [...todos];
              newTodos[todoData.index].done = true;
              setTodos(newTodos);});
  };

  // remove todo from current list
  const removeTodo = todoData => {
      axios.delete(`/api/v1/todos/${todoData.id}`)
          .then(r => {
              const newTodos = [...todos];
              newTodos.splice(todoData.index, 1);
              setTodos(newTodos);
          });  // catch error?
  };

  // CssBaseLine for compatibility
  return (
      <React.Fragment>
        <CssBaseline />
          <Grid container spacing={2} className={classes.cardcontainer}>
            {todos.map((todo, index) => (
                <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                />
            ))}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <TodoForm addTodo={addTodo} />
              </Grid>
            </Grid>
          </Grid>
      </React.Fragment>
  );
}


export default App;