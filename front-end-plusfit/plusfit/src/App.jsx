import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css'

import { ThemeProvider } from '@mui/material/styles';
import theme from './ui/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

import TopBar from './ui/TopBar';

import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom'
import AuthUSerContext from './Contexts/AuthUserContext';
import myfetch from './lib/myfetch';
import FooterBar from './ui/FooterBar';


function App() {
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <TopBar/>
          <Box sx={{ margin: '24px 24px 72px 24px' }}>
            <AppRoutes />
          </Box>
          <FooterBar />
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App