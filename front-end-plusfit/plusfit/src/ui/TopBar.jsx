import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logoGigantes2.png';
import MainMenu from './MainMenu'
import Login from './Login';

export default function TopBar() {
  const [openLogin, setOpenLogin] = React.useState(false)

  const handleLoginClick = () => {
    setOpenLogin(!openLogin) //seta open login para o inverso , se for true para falso, se for falso para true
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" enableColorOnDark>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <MainMenu />
          <Box sx={{ flexGrow: 1 }}>
            <img src={logo} alt="Logotipo Gigantes" style={{ width: '250px ', margin: '10px'}} />
          </Box>
          <Button color="inherit" onClick={handleLoginClick}>Login</Button>
        </Toolbar>
      </AppBar>
      {openLogin && <Login/>} {/*se open login for true renderiza componente login*/}
    </Box>
  );
}