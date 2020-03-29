import React, {useState, useEffect, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, Button, FormControlLabel, FormGroup, FormControl } from '@material-ui/core';
import AnswCRUD from '../services/answer-service';
import MyContext from '../../context'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '15ch',
    },
  },
}));

const Chack_input = props => {
    const classes = useStyles();
    const { status } = useContext(MyContext); //es para saber si se debe o no habilitar el boton de siguiente, solo una seleccion haya sido elegida

    const [answer, setAnswer] = useState([])
    const formAnswService = new AnswCRUD();
    const getAnswer = () => {
      formAnswService.getById(props.answId).then(res => setAnswer(res))
    }

    useEffect(() => {
      getAnswer()
    }, [props.answId])

    return (
        <div>
            <div className={classes.root} noValidate autoComplete="off">
                <FormControl component="fieldset">
                    <FormGroup aria-label="position" column>
                        {
                            answer.map(item => {
                                return (
                                    <FormControlLabel
                                        name={item.short_answer}
                                        value={props.state[item.short_answer]}
                                        control={<Checkbox color="primary" />}
                                        label={item.long_answer}
                                        labelPlacement="top"
                                        onChange={props.onChange}
                                    />
                                )
                            })
                        }
                    </FormGroup>
                </FormControl>
            </div>



            <FormControlLabel
                control={<Button variant="contained" color="secondary" disabled={!props.state[answer.short_answer]}><Link to={`/hogar/${answer.next_question}`}> Siguiente</Link></Button>}
            />
        </div>

    )
    }

export default Chack_input