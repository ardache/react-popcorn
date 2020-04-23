import React, { useState, useEffect, Fragment } from 'react'
import QuesCRUD from '../services/question-service';
import {useParams} from 'react-router-dom';

import { Bounce } from 'react-reveal';
import MyContext from '../../context'

const MasterInsurance = props => {

    //const { updateBranch } = useContext(MyContext);

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
        //updateBranch(question.branch)  CONTEXT
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
        <MyContext.Provider value={{branch: question.branch}}>
            <Fragment>
                <h3>Popcorn</h3>
                        <Bounce right>
                            <header className="App-header">
                                <h1>Tu seguro esta listo!</h1>
                            </header>
                        Aqui va la cobertura
                        </Bounce>
            </Fragment>
        </MyContext.Provider>
     )
}

export default MasterInsurance
