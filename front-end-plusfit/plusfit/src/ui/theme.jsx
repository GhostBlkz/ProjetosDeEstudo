import {createTheme} from '@mui/material/styles'
import {lightBlue, lightGreen} from '@mui/material/colors'

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { //cor primaria
            main: lightBlue[300]
        },
        secondary: { //cor secundaria
            main: lightGreen[200]
        }
    }
})

export default theme