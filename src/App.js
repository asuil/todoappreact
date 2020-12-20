import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Todo from './components/Todo';


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
    { text: "Learn about React",
      desc: "That front-end framework everyone is talking about",
      isDone: false },
    { text: "Meet friend for lunch",
      desc: "They're nice!",
      isDone: false },
    { text: "Build really cool todo app",
      desc: "",
      isDone: false }
  ]);

  // add a new todo to the current list
  const addTodo = newTodo => {
    const newTodos = [...todos, {
      text: newTodo.title,
      desc: newTodo.desc,
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