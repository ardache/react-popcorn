import React, {useState, useEffect, Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Radio, Button, FormControlLabel, RadioGroup, FormControl } from '@material-ui/core';
import AnswCRUD from '../services/answer-service';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '15ch',
    },
  },
}));

const Radio_input = props => {
    const classes = useStyles();
    
    const [answer, setAnswer] = useState([])
    let field = ""
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
                {
                    answer.map(item => {
                        field= item.short_answer;
                        //console.log(item.next_question)
                        props.selection=item.next_question
                        return (
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="position" 
                                name={item.short_answer} 
                                value={props.state[item.short_answer]} 
                                onChange={props.onChange} row>
                                    <FormControlLabel
                                        control={<Radio/>}                                        
                                        label={item.long_answer}
                                        value={item.long_answer}
                                        labelPlacement="top"
                                        color="primary"
                                    />
                                </RadioGroup>
                            </FormControl>
                           
                        )
                    })
                }
            
            </div>
                    <FormControlLabel 
                    control={<Button variant="contained" color="secondary" disabled={!props.state[field]}><Link to={`/hogar/${props.state['next_question']}`}> Siguiente</Link></Button>}
                    />
        </div>
    )
    }

export default Radio_input