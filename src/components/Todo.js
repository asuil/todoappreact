import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { 
  Grid,
  Button,
  Card,
} from '@material-ui/core';

const useStyles = makeStyles({
  todocardgrid: {
    padding: '20px',
  },
  todotitle: {
    fontSize: '20px',
  },
  todosubtitle: {
    color: '#aaaaaa',
  },
  todobutton: {
    margin: '3px',
  },
  buttoncontainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
});

/**
 * Todo Component
 * @param todo: {text: todo content, isDone: true/false depending on todo state}
 * @param index: used to identify this todo
 * @param completeTodo: function to execute when clicking "done"
 * @param removeTodo: function to execute when clicking "delete"
 * @returns individual todo div
 */
function Todo({ todo, index, completeTodo, removeTodo }) {

  // global styles
  const classes = useStyles();

  return (
      <Grid item xs={6}>
        <Card>
          <Grid container className={classes.todocardgrid}>
            <Grid item xs={6}>
              <Typography className={classes.todotitle} style={{ textDecoration: todo.done ? "line-through" : "" }}>
                {todo.title}
              </Typography>
              <Typography className={classes.todosubtitle} style={{ textDecoration: todo.done ? "line-through" : "" }}>
                {todo.desc}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <CardActions className={classes.buttoncontainer}>
                <Button
                    className={classes.todobutton}
                    variant="contained"
                    color="primary"
                    onClick={() => completeTodo({id: todo.id, index: index})}
                >
                  Done!
                </Button>
                <Button
                    className={classes.todobutton}
                    variant="contained"
                    color="primary"
                    onClick={() => removeTodo({id: todo.id, index: index})}
                >
                  Delete
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </Grid>
  );
}

export default Todo;
