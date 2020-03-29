import React, {useState, useEffect, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import AnswCRUD from '../services/answer-service';
//import MyContext from '../../context'
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
    //const { status } = useContext(MyContext); //es para saber si se debe o no habilitar el boton de siguiente, solo una seleccion haya sido elegida

    const [ answer, setAnswer ] = useState([])
    const formAnswService = new AnswCRUD();
    const getAnswer = () => {
      formAnswService.getById(props.answId).then(res=>setAnswer(res));
    
    }

    useEffect(() => {
      getAnswer()
    }, [props.answId])

        return (
          <div>
            {
              answer.map(item => {
                return (

                  <div className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" value={props.state[item.short_answer]} name={item.short_answer} label={item.long_answer} variant="outlined" color="secondary" onChange={props.onChange} /><br></br>
                    <Button variant="contained" color="secondary" disabled={!props.state[item.short_answer]}><Link to={`/hogar/${item.next_question}`}> Siguiente</Link></Button>
                  </div>
                )
              })
            }

          </div>
                
                
            
        )
    }

export default SingleText_input
