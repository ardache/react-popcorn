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
        adds:'',
        newAdquisicion:'',
        switchInsurance:'',
        otherMotivation:'',
        next_question:'',
        points:0
    })
    const handleChange = (event) => {  
        const { name, value } = event.target;
        updateFormState(Object.assign({}, formState, {[name]: value}))
        //setNextQuestion({})
      }

    const handleCheck = (data) => {  
      const newPoints = nextQuestion.qPoints
      const value = nextQuestion.dataAnswer
      console.log(data, value )
      updateFormState(Object.assign({}, formState, {[data]: value, points: formState.points + newPoints}))
      setNextQuestion({})
    }


    const [ nextQuestion, setNextQuestion ] = useState({ 
        nextQuestion : '',
        dataAnswer:'',
        qPoints:0
    })  
    const handleCheckSelection = (data, selAnswer, datapoints) => {   //
        setNextQuestion(Object.assign({}, nextQuestion, {
            nextQuestion: data,
            dataAnswer: nextQuestion.dataAnswer + selAnswer, 
            qPoints: nextQuestion.qPoints + datapoints
        })) //
    }

    const handleRadioSelection = (data, field, item, datapoints) => {   //
        setNextQuestion(Object.assign({}, nextQuestion, {
            nextQuestion: data,
            [field]: item,
            dataAnswer: item,
            qPoints: datapoints
        })) //
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
                            ? <RadioInput answId={question._id} next={nextQuestion} selection={handleRadioSelection} onClick={handleCheck}/>
                            : question.kind === 'checklist'  
                            ? <CheckInput answId={question._id} next={nextQuestion} selection={handleCheckSelection} onClick={handleCheck}/>
                            : <div></div> 
                        }
                        </Bounce>
            </Fragment>
        //</MyContext.Provider>
     )
}

export default MasterForm
