import {createTheme} from '@mui/material/styles'
import {blue} from '@mui/material/colors'

import { ptBR as ptBR_datagrid } from '@mui/x-data-grid/locales'
import { ptBR as ptBR_datepicker } from '@mui/x-date-pickers/locales'

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { //cor primaria
            main: blue[500]
        },
        secondary: { //cor secundaria
            main: '#550b6a'
        }
    },
    typography: {
        h1: {
          fontSize: '30pt',
          fontWeight: 'bold'
        }
      }
},
ptBR_datagrid, ptBR_datepicker
)

export default theme