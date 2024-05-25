import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo from "../assets/logoGigantes2.png";
import MainMenu from '../ui/MainMenu'
import { useNavigate } from 'react-router-dom';


export default function TopBar() {
  const [openLogin, setOpenLogin] = React.useState(false)

  const navigate = useNavigate()
  //useEffect para que openLogin sempre seja false antes de clicar
  // para evitar de setar ele para true depois voltar a pagina inicial e ter que apertar em login 2 vezes para a pagina abrir denovo
  useEffect(() => {
    setOpenLogin(false)
  }, [openLogin])
 
  const handleLoginClick = () => {
    const newOpenLogin = !openLogin; //inverte o estado de openLogin
    setOpenLogin(newOpenLogin);

    // Navega para a página de login apenas se newOpenLogin for true
    if (newOpenLogin) {
      navigate("/login");
    }


  };
  



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" enableColorOnDark className='app-bar'>
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