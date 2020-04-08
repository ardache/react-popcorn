import React, { useState, useEffect} from 'react';
import QuestionCRUD from '../admin-services/question-service'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { MenuAdmin } from './MenuAdmin';

const useStyles = makeStyles((theme)=> ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(35),
      height: theme.spacing(25),
    },
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 10,
  },
}));

const QuestionAdmin = props => {
  const classes = useStyles();
  let { branch } = useParams()
  
  const questionService = new QuestionCRUD();
  const [formState, updateFormState] = useState({})
  const handleFormSubmit = (event) => {
    event.preventDefault();
    questionService.createQuestion(formState)
        updateFormState({})
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateFormState(Object.assign({}, formState, { [name]: value }))
  }
  
  const [ questions, setQuestion ] = useState([])
  const getAllQuestions = () => {
    
    const questionService = new QuestionCRUD();
    questionService.getByBranch(branch).then(res=>setQuestion(res));
}

useEffect(() => {
    getAllQuestions()
}, [])

  return (
    <div>
      <MenuAdmin />
      <h2>Admin Preguntas</h2>
      <div className={classes.root}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Pregunta Nueva
            </Typography>

            <Typography variant="body2" component="p">
              <form onSubmit={handleFormSubmit}>
                <label>Pregunta:</label>
                <input type="text" name="question" value={formState.question} onChange={e => handleChange(e)} />
                <label>Tipo:</label>
                <select name="type" value={formState.type} onChange={e => handleChange(e)}>
                  <option value=""></option>
                  <option value="texto">Texto</option>
                  <option value="opcion multiple">Opción Multiple</option>
                  <option value="checklist">Check Box</option>
                </select>

                <input type="submit" value="Submit" />
              </form>
            </Typography>
          </CardContent>
        </Card>
      </div>

      <h3>Preguntas</h3>
      <div className={classes.root}>
        {
          questions.map((ques, i) => {
            return (
              <Paper elevation={5}>
                <Card>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Pregunta No. {i + 1}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {ques.question}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary">
                      <Link to={`/questionadmin/${ques.name}`}>Respuestas</Link>
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary">
                      <Link to={`/questionadmin/${ques.name}`}>Editar</Link>
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary">
                      <Link to={`/questionadmin/${ques.name}`}>Borrar</Link>
                    </Button>

                  </CardActions>


                </Card>
              </Paper>
            )
          })
        }

      </div>
    </div>
    )
  
}
export default QuestionAdmin