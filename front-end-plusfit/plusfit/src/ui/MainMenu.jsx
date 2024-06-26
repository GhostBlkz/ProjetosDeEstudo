import * as React from 'react';
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom'

export default function MainMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/">
          Pagina Inicial
          </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/clientes">
          Clientes
          </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/admins">
          Administradores
          </MenuItem>
      </Menu>
    </div>
  );
}