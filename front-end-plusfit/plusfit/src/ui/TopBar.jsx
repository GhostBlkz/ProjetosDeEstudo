import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../assets/logoGigantes2.png";
import MainMenu from '../ui/MainMenu'
import LoginPage from '../Pages/LoginPage';
import { useNavigate } from 'react-router-dom';


export default function TopBar() {
  const [openLogin, setOpenLogin] = React.useState(false)

  const navigate = useNavigate()

  const handleLoginClick = () => {
    setOpenLogin(!openLogin) //seta open login para o inverso , se for true para falso, se for falso para true
   
    if (openLogin){ //se for true vai para a pagina de login, se n vai para a pagina inicial
      navigate("/login")
    }
    else {navigate("/")}
  }



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" enableColorOnDark>
        <Toolbar>
          <MainMenu />
          <Box sx={{ flexGrow: 1 }}>
            <img src={logo} alt="Logotipo Gigantes" style={{ width: '250px ', margin: '10px'}} />
          </Box>
          <Button color="inherit" onClick={handleLoginClick} sx={{ fontSize: 18}}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}