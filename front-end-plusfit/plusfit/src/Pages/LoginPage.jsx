import { useState } from 'react';
import { Paper, Chip, Switch } from '@mui/material'
import FormSignup from '../FormControl/signup';
import FormLogin from '../FormControl/login';
import FaceIcon from '@mui/icons-material/Face';
import LockIcon from '@mui/icons-material/Lock';


function LoginPage() {

    const [checked, setChecked] = useState(true)


    const handleChange = (event) => {
        setChecked(event.target.checked);
    }
    return (
        <div className='LoginPage'>
            <Paper elevation={6} style={{ padding: '10px', width: 350, margin: "10% auto" }}>
                <div align="center">
                   
                    {checked ? (
                        <Chip
                            id = "chip2"
                            label="Entrar"
                            color='primary'
                            variant='outlined'
                            icon={<LockIcon />}
                            margin="normal"
                        />

                    ) : (
                        <Chip
                            id ="chip1"
                            label="Criar conta"
                            color='primary'
                            variant='outlined'
                            icon={<FaceIcon />}
                        />
                    )}
                    <br />
                    <Switch checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controled' }}
                        id='check1'
                    />
                </div>
                {checked ? <FormLogin /> : <FormSignup />}
            </Paper>
        </div>
    )
}

export default LoginPage
