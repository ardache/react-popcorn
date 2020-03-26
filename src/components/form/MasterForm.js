import React, { useState, useEffect } from 'react'
import { Bounce } from 'react-reveal';
import QuesCRUD from '../services/question-service';
import {useParams} from 'react-router-dom';
import SingleText_input from '../inputs/SingleText-input'

const MasterForm = props => {

    const [ formState, updateFormState ] = useState({ 
        name: '',
        lastname: '',
        address: '',
        owner:false,
        roomie:'',
        fire:'',
        theft:'',
        newAdquisicion:'',
        switchInsurance:'',
        otherMotivation:''
    })

    const handleChange = (event) => {  
        const { name, value } = event.target;
        updateFormState(Object.assign({}, formState, {[name]: value}))
      }

    const [ question, setQuestion ] = useState({})
    const { id } = useParams()
    const getQuestion = () => {
        const formService = new QuesCRUD();
        formService.getById(id).then(res => setQuestion(res))
    }
    
    useEffect(() => {
        getQuestion()
    }, [])

    
    return (
        <div>
            <h3>Popcorn</h3>
            <Bounce right>
            <header className="App-header">
            <h1>{question.question}</h1>
    <p>{question.answers}</p>
            </header>
            </Bounce>
                <body>
                    {question.kind === 'texto' 
                        ? <SingleText_input answId={question.answers}/>
                        : question.kind === 'doble texto'
                        ? <p>Seré doble texto</p>
                        : question.kind === 'opcion multiple'  
                        ? <p>Seré un Check</p>
                        : <p>Seré Opcion Multiple</p>
                    }
                </body>  
        </div>
     )
}

export default MasterForm
