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
    let field = ""
    
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
                {
                    answer.map((item, i) => {
                        field= item.short_answer;
                        return (
                            
                            <FormControl key={i} component="fieldset">
                                <RadioGroup aria-label="position" 
                                name={item.short_answer} 
                                value={props.state[item.short_answer]} 
                                //onChange={props.onChange} 
                                onClick={() => props.selection(
                                    item.next_question,
                                    item.long_answer,
                                    item.points
                                    )}
                                >
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
                control={
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={!props.next['dataAnswer']}
                        onClick={() => props.onClick(field)}
                    >
                        <Link to={`/hogar/${props.next['nextQuestion']}`}> Siguiente</Link>
                    </Button>}
            />
        </Bounce>
    )
    }

export default RadioInput