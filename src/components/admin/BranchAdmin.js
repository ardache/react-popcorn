import React, { useState, useEffect, Fragment } from 'react';
import BranchCRUD from '../admin-services/branch-service'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { MenuAdmin } from './MenuAdmin';


const useStyles = makeStyles((theme)=> ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(35),
      height: theme.spacing(40),
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
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
      .then(() => getAllBranch());
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
    <Fragment>
      <MenuAdmin/>

      <h2>Admin Ramos</h2>
      <div className={classes.root}>

        <Card elevation={5}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Ramo Nuevo
                  </Typography>

            <Typography variant="body2" component="span">
            
              <form onSubmit={handleFormSubmit}>
                <TextField type="text" name="name" value={formState.name} onChange={e => handleChange(e)} variant="outlined" color="secondary" label="Nombre del Ramo"/>
                <br></br>
                
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="outlined-label">Logo</InputLabel>
                  <Select
                    color="secondary"
                    labelId="outlined-label"
                    id="select-outlined"
                    name="logo"
                    value={formState.logo}
                    onChange={e => handleChange(e)}
                    label="logo"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'FaHome'}>Casa</MenuItem>
                    <MenuItem value={'FaBiohazard'}>Pandemia</MenuItem>
                    <MenuItem value={'FaBicycle'}>Bicicleta</MenuItem>
                    <MenuItem value={'FaDog'}>Mascota</MenuItem>
                  </Select>
                </FormControl>

 
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="outlined-label">Disponible</InputLabel>
                  <Select
                    color="secondary"
                    labelId="outlined-label"
                    id="select-outlined"
                    name="available"
                    value={formState.available}
                    onChange={e => handleChange(e)}
                    label="available"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'true'}>Si</MenuItem>
                    <MenuItem value={'false'}>No</MenuItem>
                  </Select>
                </FormControl>

                <Button size="small"
                  variant="contained"
                  color="secondary"
                  type="submit"
                  value="Submit">Guardar
                    </Button>

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

  
                <Card key={i} elevation={5}>
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
                      <Link to={`/branchadmin/${item._id}`}>Borrar</Link>
                    </Button>
                  </CardActions>
                </Card>


            )
          })
        }
      </div>
    </Fragment>
  )
  
}
export default BranchAdmin