import React from "react";
import { Avatar, Button, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Checkbox from '@mui/material/Checkbox';

const Login = () => {

    const paperStyle = { padding: 20, height: '55vh', width: 290, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#030361' }
    const buttonStyle = {margin:'15px 0'}
    const linkStyle = {margin:'5px 0'}
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign in</h2>
                </Grid>
                <TextField label='Login' placeholder="Digite seu Login" margin="normal" fullWidth required />
                <TextField label='Senha' placeholder="Digite sua Senha" margin="normal" type='password' fullWidth required />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                            
                        />
                    } 
                    label ="Lembre-se de mim" 
                    />
                    <Button variant="contained" color="primary"fullWidth style={buttonStyle}>
                        Login
                    </Button>
                    <Typography style={linkStyle}>
                    <Link href='#' underline="hover" >
                        {'Esqueci minha senha'}
                    </Link>
                    </Typography >
                    <Typography >Você tem uma conta? <br /> 
                    <Link href='#' underline="hover" >
                        {'Criar Conta'}
                    </Link>
                    </Typography>
            </Paper>
        </Grid>
    )
}

export default Login