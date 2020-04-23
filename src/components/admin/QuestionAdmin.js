import React, { useState, useEffect, Fragment} from 'react';
import QuestionCRUD from '../admin-services/question-service'
import BranchCRUD from '../admin-services/branch-service'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom'
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
      height: theme.spacing(35),
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

const QuestionAdmin = props => {
  const classes = useStyles();
  let { branch, _id } = useParams()
  
  const questionService = new QuestionCRUD();
  const [formState, updateFormState] = useState({
        question:'',
        kind:'',
        branch:branch,
        idBranch: _id
  })
  const handleFormSubmit = (event) => {
    event.preventDefault();
    questionService.createQuestion(formState)
      .then(() => getAllQuestions());
    updateFormState({
      question: '',
      kind: '',
      branch: branch,
      idBranch: ''
    })
  }

  const deleteQuestion = (id) => {
    const questionService = new QuestionCRUD();
    questionService.delete(id).then(()=>getAllQuestions());
  }

  const initQuestion = (id, nextQuestionId) => {
    const branchService = new BranchCRUD();
    branchService.edit(id, nextQuestionId).then(()=>getAllQuestions());
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
    <Fragment>
      <MenuAdmin />
      <h2>Admin Preguntas</h2>
      <div className={classes.root}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Pregunta Nueva
              <br />
            </Typography>

            <Typography variant="body2" component="span">
              <form onSubmit={handleFormSubmit}>
                <TextField className={classes.text} id="outlined-basic" value={formState.question} name="question" label="Pregunta" variant="outlined" color="secondary" onChange={e => handleChange(e)} />

                <br />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="outlined-label">Tipo de respuestas</InputLabel>
                  <Select
                    color="secondary"
                    labelId="outlined-label"
                    id="select-outlined"
                    name="kind"
                    value={formState.type}
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

      <h3>Preguntas</h3>
      <div className={classes.root}>
        {
          questions.map((ques, i) => {
            return (
              //<Paper elevation={5}>
                <Card key={i}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Pregunta No. {i + 1}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {ques.question}
                    </Typography>
                    <Typography className={classes.title}>
                      {ques.kind} {ques._id}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary">
                      <Link to={`/answer/${ques._id}`}>Respuestas</Link>
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
                      color="secondary"
                      onClick={() => initQuestion(formState.idBranch, ques._id) }>Inicio
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteQuestion(ques._id) }>Borrar
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
export default QuestionAdmin