import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import AnswCRUD from '../services/answer-service';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const SingleText_input = props => {
    const classes = useStyles();


const [answer, setAnswer] = useState({})

const getAnswer = () => {
  const formAnswService = new AnswCRUD();
  formAnswService.getById(props.answId).then(res => setAnswer(res))
}

useEffect(() => {
  getAnswer()
}, [])


    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label={answer.long_answer} variant="outlined" /><br></br>
                <Button href={`/hogar/1/${answer.next_question}`} variant="contained" color="secondary">
                Siguiente
                </Button>
            </form>
        </div>
    )
}

export default SingleText_input
