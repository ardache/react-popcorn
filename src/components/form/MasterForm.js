import React, { useState, useEffect, useContext, Fragment} from 'react'
import QuesCRUD from '../services/question-service';
import {useParams} from 'react-router-dom';

import SingleText_input from '../inputs/SingleText-input'
import Check_input from '../inputs/Check-input'
import Radio_input from '../inputs/Radio-input'

import { Bounce } from 'react-reveal';
import MyContext from '../../context'

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

    const handleSelection = (data) => {  
        console.log(data)
    }
    
    
    const [ question, setQuestion ] = useState({})
    const { id } = useParams()
    const getQuestion = () => {
        const formService = new QuesCRUD();
        formService.getById(id).then(res => setQuestion(res))
    }
    
    useEffect(() => {
        getQuestion()
    }, [id])


    
    return (
        <MyContext.Provider value={{status: formState.status, updateContext: updateFormState}}>
        
                <h3>Popcorn</h3>
                    <Bounce right>
                            <header className="App-header">
                                <h1>{question.question}</h1>
                            </header>
                  
                        <Fragment>
                        {question.kind === 'texto' 
                            ? <SingleText_input answId={question._id} state={formState} onChange={ e => handleChange(e)}/>
                            : question.kind === 'doble texto'
                            ? <p>Seré doble texto</p>
                            : question.kind === 'opcion multiple'  
                            ? <Radio_input answId={question._id} state={formState} onChange={ e => handleChange(e)} selection={handleSelection}/>
                            : <Check_input answId={question._id} state={formState} onChange={ e => handleChange(e)}/>
                        }
                        </Fragment>
                    
                    </Bounce>
            
        
        </MyContext.Provider>
     )
}

export default MasterForm
