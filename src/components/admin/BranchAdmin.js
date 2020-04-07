import React, { useState, useEffect } from 'react';
import BranchCRUD from '../admin-services/branch-service'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { MenuAdmin } from './MenuAdmin';


const useStyles = makeStyles((theme)=> ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(35),
      height: theme.spacing(25),
    },
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 10,
  },
}));


const BranchAdmin = props => {
  const classes = useStyles();

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
      <MenuAdmin/>

      <h2>Admin Ramos</h2>
      <div className={classes.root}>

        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Ramo Nuevo
                  </Typography>

            <Typography variant="body2" component="p">
              <form onSubmit={handleFormSubmit}>
                <label>Nombre del Ramo:</label>
                <input type="text" name="name" value={formState.name} onChange={e => handleChange(e)} />
                <br></br>
                <label>Logo:</label>
                <select name="logo" value={formState.logo} onChange={e => handleChange(e)}>
                  <option value=""></option>
                  <option value="FaHome">Casa</option>
                  <option value="FaBiohazard">Pandemia</option>
                  <option value="FaBicycle">Bicicleta</option>
                  <option value="FaDog">Mascota</option>
                </select>
                <br></br>
                <label>Disponible:</label>
                <select name="available" value={formState.available} onChange={e => handleChange(e)}>
                  <option value=""></option>
                  <option value="true">Si</option>
                  <option value="false">No</option>
                </select>
                <br></br>
                <br></br>
                <input type="submit" value="Submit" />
              </form>

            </Typography>


          </CardContent>
        </Card>

      </div>


      <h3>Ramos Disponibles</h3>
      <div className={classes.root}>
        {
          branches.map((item, i) => {
            return (

              <Paper elevation={5}>
                <Card>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Ramo
                  </Typography>
                    <Typography variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {item.available ? 'Habilitado' : 'Deshabilitado'}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {item.logo}
                      <br />
                      {'"PopCorn Rocks"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary">
                      <Link to={`/questionadmin/${item.name}`}>Preguntas</Link>
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary">
                      <Link to={`/questionadmin/${item.name}`}>Editar</Link>
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary">
                      <Link to={`/questionadmin/${item.name}`}>Borrar</Link>
                    </Button>
                  </CardActions>
                </Card>
              </Paper>

            )
          })
        }
      </div>
    </div>
  )
  
}
export default BranchAdmin