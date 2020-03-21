import React, { useState, useEffect } from 'react'
import { Bounce } from 'react-reveal';
import QuesCRUD from '../services/question-service';
import {useParams} from 'react-router-dom';

const MasterForm = props => {

    const [question, setQuestion] = useState({description: ''})

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

    const {id} = useParams()

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
            <h1>{question.description}</h1>
            </header>
            </Bounce>
                <body>
                    <div>
                        <form>
                            <input type="text" name="name" value={formState.name} placeholder="NOMBRE" onChange={e => handleChange(e)} />
                            <input type="text" name="lastname" value={formState.lastname} placeholder="APELLIDO" onChange={e => handleChange(e)} />
                            <br></br>
                            <label> Vamos !!!</label>
                        </form>
                    </div>
                </body>
        </div>
    
     )
}

export default MasterForm
