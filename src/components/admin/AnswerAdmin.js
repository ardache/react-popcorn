import React, { useState, useEffect, Fragment} from 'react';
import QuestionCRUD from '../admin-services/question-service'
import AnswerCRUD from '../admin-services/answer-service'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useParams } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//import Paper from '@material-ui/core/Paper';
import { MenuAdmin } from './MenuAdmin';

const useStyles = makeStyles((theme)=> ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(45),
      height: theme.spacing(40),
    },
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  text: {
    margin: theme.spacing(1),
    minWidth: 300
  },
}));

const AnswerAdmin = props => {
  const classes = useStyles();
  let { _id } = useParams()
  
  const answerService = new AnswerCRUD();
  const [formState, updateFormState] = useState({
  parent: _id,
  })
  const handleFormSubmit = (event) => {
    event.preventDefault();
    answerService.createAnswer(formState)
      .then(() => getAllAnswers());
    updateFormState({
    parent: _id,
    nextQuestion:'',

    })
  }

  const deleteAnswer = (id) => {
    const answerService = new AnswerCRUD();
    answerService.delete(id).then(()=>getAllAnswers());
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateFormState(Object.assign({}, formState, { [name]: value }))
  }
  
  const [ answers, setAnswer ] = useState([])
  const getAllAnswers = () => {
    const answerService = new AnswerCRUD();
    answerService.getById(formState.parent).then(res=>setAnswer(res));
  }

  const [ questions, setQuestions ] = useState([])
    const getQuestionByBranch = () => {
        const questionService = new QuestionCRUD();
        questionService.getByBranch(props.branch).then(res=>setQuestions(res))
    }

    
    const updateNextQuestion = (id, nextQuestionId) => {
        const answerService = new AnswerCRUD();
        answerService.edit(id, nextQuestionId).then(()=>getAllAnswers());
      }
  

useEffect(() => {
    getAllAnswers()
    getQuestionByBranch()
}, [])

  return (
    <Fragment>
      <MenuAdmin />
      <h2>Admin Respuestas</h2>
      <div className={classes.root}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Respuesta Nueva
              <br />
            </Typography>

            <Typography variant="body2" component="span">
              <form onSubmit={handleFormSubmit}>
                <TextField className={classes.text} id="outlined-basic" value={formState.long_answer} name="long_answer" label="Respuesta" variant="outlined" color="secondary" onChange={e => handleChange(e)} />
                <br />
                <TextField className={classes.text} id="outlined-basic" value={formState.points} name="points" label="Puntos" variant="outlined" color="secondary" onChange={e => handleChange(e)} />
                
                <br />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="outlined-label">Siguiente Pregunta</InputLabel>
                  <Select
                    color="secondary"
                    labelId="outlined-label"
                    id="select-outlined"
                    name="kind"
                    value={formState.next_question}
                    onChange={e => handleChange(e)}
                    label="kind"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'texto'}>Cuadro de texto</MenuItem>
                    <MenuItem value={'opcion multiple'}>Opcion multiple</MenuItem>
                    <MenuItem value={'checklist'}>Check list</MenuItem>
                  </Select>
                </FormControl>
                <br />

                <Button size="small"
                  variant="contained"
                  color="secondary"
                  type="submit"
                  value="Submit">Guardar
                    </Button>
              </form>
            </Typography>
          </CardContent>
        </Card>
      </div>

      <h3>Respuestas</h3>
      <div className={classes.root}>
        {
          answers.map((answ, i) => {
            return (
              //<Paper elevation={5}>
                <Card key={i}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Respuesta No. {i + 1}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {answ.long_answer}
                    </Typography>
                    <Typography className={classes.title}>
                      Puntos: {answ.points}
                    </Typography>

                    <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="outlined-label">Siguiente Pregunta</InputLabel>
                  <Select
                    color="secondary"
                    labelId="outlined-label"
                    id="select-outlined"
                    name="nextQuestion"
                    value={formState.nextQuestion}
                    onChange={e => handleChange(e)}
                    label="kind"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                                {
                                    questions.map(quest => {
                                        return (
                                                <MenuItem name={answ._id} value={quest._id}>{quest.question}</MenuItem>                                           
                                        )
                                    })
                                }
                  </Select>
                </FormControl>

                  </CardContent>
                  <CardActions>
                    
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={ () => deleteAnswer(answ._id) }>Borrar
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      color="secondary">Actualizar
                    </Button>

                  </CardActions>


                </Card>
             // </Paper>
            )
          })
        }

      </div>
    </Fragment>
    )
  
}
export default AnswerAdmin