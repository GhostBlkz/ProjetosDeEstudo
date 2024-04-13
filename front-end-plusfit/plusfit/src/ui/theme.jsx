import {createTheme} from '@mui/material/styles'
import {blue, pink} from '@mui/material/colors'

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { //cor primaria
            main: blue[500]
        },
        secondary: { //cor secundaria
            main: pink[200]
        }
    },
    typography: {
        h1: {
          fontSize: '30pt',
          fontWeight: 'bold'
        }
      }
})

export default theme