import React, { useState, useEffect} from 'react';
import BranchCRUD from '../admin-services/branch-service'


const BranchAdmin = props => {

  const branchService = new BranchCRUD();

  const [formState, updateFormState] = useState({
    name: '',
    logo: '',
    available: '',
    next_question: ''
  })

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    branchService.createBranch(formState)
        updateFormState({
          name: '',
          logo: '',
          available: null
        })
    
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateFormState(Object.assign({}, formState, { [name]: value }))
  }
  
  const [ branches, setBranch ] = useState([])

  const getAllBranch = () => {
    const branchService = new BranchCRUD();
    branchService.getAll().then(res=>setBranch(res));
}

useEffect(() => {
    getAllBranch()
}, [])

    return (
      <div>
        
        <h2>Admin Ramos</h2>
        <h3>Ramo Nuevo</h3>
        <form onSubmit={handleFormSubmit}>
          <label>Nombre del Ramo:</label>
          <input type="text" name="name" value={formState.name} onChange={e => handleChange(e)} />
          <label>Logo:</label>
          <select name="logo" value={formState.logo} onChange={e => handleChange(e)}>
          <option value=""></option>
            <option value="FaHome">Casa</option>
            <option value="FaBiohazard">Pandemia</option>
            <option value="FaBicycle">Bicicleta</option>
            <option value="FaDog">Mascota</option>
          </select>
          <label>Disponible:</label>
          <select name="available" value={formState.available} onChange={e => handleChange(e)}>
          <option value=""></option>
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>

          <input type="submit" value="Submit" />
        </form>

        <h3>Ramos Disponibles</h3>
        
        {
          branches.map(branch => {
            return (
            <p>{branch.name}</p>
            )
          })
        }

      </div>
    )
  
}
export default BranchAdmin