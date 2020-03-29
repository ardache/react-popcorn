import React, { useState, useEffect, useContext, Fragment} from 'react'
import QuesCRUD from '../services/question-service';
import {useParams} from 'react-router-dom';
import SingleText_input from '../inputs/SingleText-input'
import Check_input from '../inputs/Check-input'
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
        otherMotivation:''
    })
    
    const { status_input, updateStatus } = useContext(MyContext);

    const handleChange = (event) => {  
        const { name, value } = event.target;
        updateFormState(Object.assign({}, formState, {[name]: value}))  
        updateStatus({status_input: 'true'})
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
                            ? <SingleText_input answId={question._id} state={formState} status={status_input} onChange={ e => handleChange(e)}/>
                            : question.kind === 'doble texto'
                            ? <p>Seré doble texto</p>
                            : question.kind === 'opcion multiple'  
                            ? <Check_input answId={question._id} state={formState} status={status_input} onChange={ e => handleChange(e)}/>
                            : <p>Seré Opcion Multiple</p>
                        }
                        </Fragment>
                    
                    </Bounce>
            
        
        </MyContext.Provider>
     )
}

export default MasterForm
