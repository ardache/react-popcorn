import React, {useState, useEffect, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import AnswCRUD from '../services/answer-service';
import MyContext from '../../context'
import { Link } from 'react-router-dom'

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
    const { status } = useContext(MyContext); //es para saber si se debe o no habilitar el boton de siguiente, solo una seleccion haya sido elegida

    const [answer, setAnswer] = useState({})
    const getAnswer = () => {
      const formAnswService = new AnswCRUD();
      formAnswService.getById(props.answId).then(res => setAnswer(res))
    }

    useEffect(() => {
      getAnswer()
    }, [props.answId])

        return (
            
                <div className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" name={answer.short_answer} label={answer.long_answer} variant="outlined" onChange={props.onChange}/><br></br>
                    <Button  variant="contained" color="secondary" disabled={status}><Link to={`/hogar/${answer.next_question}`}> Siguiente</Link></Button>
                </div>
            
        )
    }

export default SingleText_input
