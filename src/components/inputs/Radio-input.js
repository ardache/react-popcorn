import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Radio, Button, FormControlLabel, RadioGroup, FormControl } from '@material-ui/core';
import AnswCRUD from '../services/answer-service';
import { Link } from 'react-router-dom'
import { Bounce } from 'react-reveal';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '15ch',
    },
  },
}));

const RadioInput = props => {
    const classes = useStyles();
    
    const [answer, setAnswer] = useState([])
    let field = answer.length>0 ? answer[0].short_answer : '';
    console.log(field)
    
    useEffect(() => {
        const getAnswer = () => {
            const formAnswService = new AnswCRUD();
            formAnswService.getById(props.answId).then(res => setAnswer(res))
          }

      getAnswer()
    }, [props.answId]) //verificar si no afecta este propr aqui

    return (
        <Bounce right>
            <div className={classes.root} noValidate autoComplete="off">
            <FormControl component="fieldset">
            <RadioGroup aria-label="position" 
                                name={answer.length>0 ? answer[0].short_answer : ''} 
                                value={props.next[answer.length>0 ? answer[0].short_answer : '']} 
                                //onChange={props.onChange} 
                                
                                >
                {
                    answer.map((item, i) => {
                        console.log(item)
                        return (
                            
                            
                                
                                    <FormControlLabel
                                        control={<Radio/>}                                      
                                        label={item.long_answer}
                                        value={item.long_answer}
                                        labelPlacement="top"
                                        color="primary"
                                        onClick={() => props.selection(
                                            item.next_question,
                                            field,
                                            item.long_answer,
                                            item.points
                                            )}
                                    />
                                
                            
                        )
                    })
                }
                </RadioGroup>
            </FormControl>
            </div>
            <FormControlLabel
                control={
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={!props.next[field]}
                        onClick={() => {
                            props.onClick(field)
                            console.log('field es ' + field);
                        }}
                    >
                        <Link to={`/hogar/${props.next['nextQuestion']}`}> Siguiente</Link>
                    </Button>}
            />
        </Bounce>
    )
    }

export default RadioInput