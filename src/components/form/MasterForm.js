import React, { useState, useEffect, Fragment} from 'react'
import QuesCRUD from '../services/question-service';
import {useParams} from 'react-router-dom';

import SingleTextInput from '../inputs/SingleText-input'
import CheckInput from '../inputs/Check-input'
import RadioInput from '../inputs/Radio-input'

import { Bounce } from 'react-reveal';
//import MyContext from '../../context'

const MasterForm = props => {

    const [ formState, updateFormState ] = useState({ 
        name: '',
        lastname: '',
        address: '',
        owner:'',
        roomie:'',
        fire:'',
        theft:'',
        newAdquisicion:'',
        switchInsurance:'',
        otherMotivation:'',
        next_question:''
    })
  
    //const { status_input, updateStatus } = useContext(MyContext);

    const handleChange = (event) => {  
        const { name, value } = event.target;
        updateFormState(Object.assign({}, formState, {[name]: value}))  
      }

    const [ nextQuestion, setNextQuestion ] = useState({ nextQuestion : ''})  
    const handleSelection = data => {  
        setNextQuestion(Object.assign({}, nextQuestion, {nextQuestion: data}))
    }
    
    
    const [ question, setQuestion ] = useState({})
    const { id } = useParams()
    
    
    useEffect(() => {
        const getQuestion = () => {
            const formService = new QuesCRUD();
            formService.getById(id).then(res => setQuestion(res))
        }
        getQuestion()
    }, [id])

    return (
        //<MyContext.Provider value={{status: formState.status, updateContext: updateFormState}}>
            <Fragment>
                <h3>Popcorn</h3>
                        <Bounce right>
                            <header className="App-header">
                                <h1>{question.question}</h1>
                            </header>
                        {question.kind === 'texto' 
                            ? <SingleTextInput answId={question._id} state={formState} onChange={ e => handleChange(e)}/>
                            : question.kind === 'doble texto'
                            ? <p>Seré doble texto</p>
                            : question.kind === 'opcion multiple'  
                            ? <RadioInput answId={question._id} state={formState} next={nextQuestion} onChange={ e => handleChange(e)} selection={handleSelection}/>
                            : question.kind === 'checklist'  
                            ? <CheckInput answId={question._id} state={formState} onChange={ e => handleChange(e)}/>
                            : <div></div>
                        }
                        </Bounce>
            </Fragment>
        //</MyContext.Provider>
     )
}

export default MasterForm
