import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const SingleText_input = props => {
    const classes = useStyles();

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label={props.label} variant="outlined" /><br></br>
                <Button href={`/hogar/1/${props.nq}`} variant="contained" color="secondary">
                Siguiente
                </Button>
            </form>
        </div>
    )
}

export default SingleText_input
