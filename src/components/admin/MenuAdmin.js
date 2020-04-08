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
            <Link to= '/' style={{ textDecoration: 'none' }} >
                <MenuItem onClick={handleClose} tab='1'>Vista Preliminar</MenuItem>
            </Link>
            <Link to= '/branchadmin' style={{ textDecoration: 'none' }}>
          <MenuItem onClick={handleClose} tab='2'>Ramos</MenuItem>
            </Link>
            <Link to= '/priceadmin' style={{ textDecoration: 'none' }}>
          <MenuItem onClick={handleClose} tab='5'>Precios</MenuItem>
            </Link>
        </Menu>
      </div>
    )
}



