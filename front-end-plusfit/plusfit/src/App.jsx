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
import Login2 from './ui/Login2';

import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom'


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

        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App