import React from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'





export const MenuAdmin = () => {

const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);

};

const handleClose = () => {
  setAnchorEl(null);
};


    return (
        <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Menu
      </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={<Link to={'/questionadmin/:branch'}>Preguntas</Link>}>Vista Preliminar</MenuItem>
          <MenuItem onClick={handleClose}>Ramos</MenuItem>
          <MenuItem onClick={handleClose}>Preguntas</MenuItem>
          <MenuItem onClick={handleClose}>Respuestas</MenuItem>
          <MenuItem onClick={handleClose}>Precios</MenuItem>
        </Menu>
      </div>
    )
}



