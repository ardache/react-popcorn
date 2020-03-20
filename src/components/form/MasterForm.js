import React, { useState } from 'react'

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

    const [ step, updateStep ] = useState({ numStep: 1})

    const handleChange = (event) => {  
        const { name, value } = event.target;
        updateFormState(Object.assign({}, formState, {[name]: value}))
      }

    const nextStep = (step) => {
        updateStep(Object.assign({}, step, {numStep: step}))
    }

    const renderPage = (page) => {
        switch (page) {
            case 1: 
                return(
                    <div>
                    <header className="App-header">
                        <h1>Hola! soy Priya. <br></br>Dejame ayudarte a conseguir <br></br> el mejor precio. <br></br>Empezamos?</h1>
                    </header>
                    <body>
                        <div>
                            <form>
                                <input type="text" name="name" value={formState.name} placeholder="NOMBRE" onChange={ e => handleChange(e)}/>
                                <input type="text" name="lastname" value={formState.lastname} placeholder="APELLIDO" onChange={ e => handleChange(e)} />
                                <br></br>
                                <label onClick={() => nextStep(2)}> Vamos !!!</label>
                            </form>
                        </div>
                    </body>
                    </div>
                )
            case 2:
                return(
                    <div>
                        <header className="App-header">
                            <h1>Mucho gusto {formState.name}! <br></br>¿ Cual es tu direccion ?</h1>
                        </header>
                        <body>
                            <div>
                            <form>
                                <input type="text" name="address" value={formState.address} placeholder="DOMICILIO" onChange={ e => handleChange(e)}/>
                                <br></br>
                                <label onClick={() => nextStep(3)}> Siguiente</label>
                            </form>
                            </div>
                        </body>
                    </div>
                )
            case 3:
                return(
                    <div>
                        <header className="App-header">
                            <h1>¿Rentas o eres dueño?</h1>
                        </header>
                        <body>
                            <div>
                            <form>
                                Inquilino
                                <input type="radio" name="owner" value={false} placeholder="RENTA" onChange={ e => handleChange(e)}/>
                                Dueño
                                <input type="radio" name="owner" value={true} placeholder="DUEÑO" onChange={ e => handleChange(e)}/>
                                <br></br>
                                <label onClick={formState.owner === "true" ? () => nextStep(10): () => nextStep(4)}> Siguiente</label>
                            </form>
                            </div>
                        </body>
                    </div>
                )
                case 4:
                    return(
                        <div>
                            <header className="App-header">
                                <h1>¿Cuentas con alguno de estos?</h1>
                            </header>
                            <body>
                                <div>
                                <form>
                                    Romies
                                    <input type="checkbox" name="roomie" value={false} onChange={ e => handleChange(e)}/>
                                    Alarma contra Incendio
                                    <input type="checkbox" name="fire" value={true} onChange={ e => handleChange(e)}/>
                                    Alarma contra Robo
                                    <input type="checkbox" name="theft" value={true} onChange={ e => handleChange(e)}/>
                                    <br></br>
                                    <label onClick={() => nextStep(3)}> Siguiente</label>
                                </form>
                                </div>
                            </body>
                        </div>
                    )
                case 10:
                    return(
                        <div>
                            <header className="App-header">
                                <h1>¿Estas cerrando una adquisicion <br></br>o solo estas pensando en cambiar <br></br>de aseguradora?</h1>
                            </header>
                            <body>
                                <div>
                                <form>
                                    Nueva Adquisicion
                                    <input type="checkbox" name="newAdquisicion" value={false} onChange={ e => handleChange(e)}/>
                                    Cambiando de Aseguradora
                                    <input type="checkbox" name="switchInsurance" value={true} onChange={ e => handleChange(e)}/>
                                    Otro
                                    <input type="checkbox" name="otherMotivation" value={true} onChange={ e => handleChange(e)}/>
                                    <br></br>
                                    <label onClick={() => nextStep(3)}> Siguiente</label>
                                </form>
                                </div>
                            </body>
                        </div>
                    )
            default: return(<div></div>)
        }
    }

    return (
        <div>
            {renderPage(step.numStep)}
        </div>
    )
}

export default MasterForm
