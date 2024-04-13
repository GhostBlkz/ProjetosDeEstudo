import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

export default function FooterBar() {
  return (
    <Toolbar
      variant="dense"
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        justifyContent: 'center',
        width: '100vw',
        backgroundColor: 'action.disabledBackground',
        
      }}
    >
      <Typography variant="caption"
        sx={{
          '& a': {
            color: 'secondary'
          }
        }}
      >
       Venha ser Gigante com a gente <FitnessCenterIcon fontSize="small" />  na academia <a href="https://www.instagram.com/gigantes_gym/">Gigantes Gym</a>.
      </Typography>
    </Toolbar>
  )
}