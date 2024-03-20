import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import logo from '../assets/logoGigantes2.png';
import MainMenu from './MainMenu';

export default function TopBar() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de autenticação
    console.log('Email:', email);
    console.log('Password:', password);
    // Resetar campos após login
    setEmail('');
    setPassword('');
    // Fechar o modal após o envio
    setOpen(false);
  };

  const handleGoogleLogin = () => {
    // Adicione a lógica de login com Google aqui
  };

  const handleFacebookLogin = () => {
    // Adicione a lógica de login com Facebook aqui
  };

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
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={logo} alt="Logotipo Gigantes" style={{ width: '250px', margin: '10px' }} />
          </Box>
          <Button color="inherit" onClick={() => setOpen(true)}>Login</Button>
        </Toolbar>
        {openMenu && <MainMenu />} {/* Renderizar o MainMenu se openMenu for verdadeiro */}
      </AppBar>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            width: 400,
            borderRadius: 4
          }}
        >
          <Typography variant="h5" gutterBottom>
            Faça login
          </Typography>
          <Divider />
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ marginBottom: 10, width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ccc' }}
            />
            <br />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ marginBottom: 10, width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ccc' }}
            />
            <br />
            <Button type="submit" variant="contained" color="primary" style={{ width: '100%', marginBottom: 10 }}>Login</Button>
          </form>
          <Divider />
          <Typography variant="subtitle1" gutterBottom style={{ margin: '10px 0' }}>
            Ou logar com:
          </Typography>
          <Button variant="contained" color="primary" onClick={handleGoogleLogin} style={{ marginRight: 10 }}>Google</Button>
          <Button variant="contained" color="primary" onClick={handleFacebookLogin}>Facebook</Button>
          <br />
          <Typography variant="subtitle2" gutterBottom style={{ marginTop: 10 }}>
            Não tem uma conta? <a href="/signup" style={{ color: 'blue', textDecoration: 'underline' }}>Crie uma agora!</a>
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}