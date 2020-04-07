import React, { useState, useEffect} from 'react';
import QuestionCRUD from '../admin-services/question-service'
import { MenuAdmin } from './MenuAdmin';


const QuestionAdmin = props => {

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
    questionService.getByBranch(props.branch).then(res=>setQuestion(res));
}

useEffect(() => {
    getAllQuestions()
}, [])

    return (
      <div>
        <MenuAdmin/>
        <h2>Admin Preguntas</h2>
        <h3>Pregunta Nueva</h3>
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

        <h3>Preguntas</h3>
        
        {
          questions.map((ques,i) => {
            return (
            <p>{i+1}.- {ques.question}</p>
            )
          })
        }

      </div>
    )
  
}
export default QuestionAdmin