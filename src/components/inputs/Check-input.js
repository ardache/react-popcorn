import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, Button, FormControlLabel, FormGroup, FormControl } from '@material-ui/core';
import AnswCRUD from '../services/answer-service';
//import MyContext from '../../context'
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

const CheckInput = props => {
    const classes = useStyles();
    //const { status } = useContext(MyContext); //es para saber si se debe o no habilitar el boton de siguiente, solo una seleccion haya sido elegida
    
    const [answer, setAnswer] = useState([])
    let field = ""
    

    useEffect(() => {
        const getAnswer = () => {
            const formAnswService = new AnswCRUD();
            formAnswService.getById(props.answId).then(res => setAnswer(res))
          }

      getAnswer()
    }, [props.answId])

    return (
        <Bounce right>
            <div className={classes.root} noValidate autoComplete="off">
                {
                    answer.map((item,i) => {
                        field= item.short_answer;
                        return (
                            <FormControl key={i} component="fieldset">
                                <FormGroup aria-label="position">
                                    <FormControlLabel
                                        control=
                                        {<Checkbox
                                            name={item.short_answer}
                                            color="primary"
                                            value={item.short_answer}
                                            //onChange={props.onChange}
                                            onClick={() => props.selection(
                                                    item.next_question,
                                                    item.long_answer,
                                                    item.points
                                                    )}
                                        />}
                                        label={item.long_answer}
                                        labelPlacement="top"
                                    />
                                </FormGroup>
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
                            <Link to={`/${props.branch}/${props.next['nextQuestion']}`}> Siguiente</Link>
                    </Button>
                }
            />
        </Bounce>
    )
}

export default CheckInput