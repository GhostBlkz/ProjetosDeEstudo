import React, { Component, useState } from 'react'
import {
    TextField,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    IconButton,
    Button,
    Alert,
    Stack
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import { Navigate } from 'react-router-dom';



// Email Validation
const isEmail = (email) => //função que valida emails
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
export default function FormLogin() {


    //Campo de senha
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //Inputs

    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')



    // validaçao do form
    const [formValid, setFormValid] = useState()
    const [success, setSuccess] = useState()


    const handleSubmit = (e) => {
        e.preventDefault()
        setSuccess(null)


        if (emailError || !emailInput) {
            setFormValid("E-mail ou senha invalidos")
            return
        }
        if (passwordError || !passwordInput) {
            setFormValid("E-mail ou senha invalidos")
            return
        }



        setFormValid(null)
        setSuccess("Entrou")




        console.log(emailInput)
        console.log(passwordInput)


    }

    // Input Error 

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);






    //Validation para onBlur Email
    const handleEmail = () => {
        if (!isEmail(emailInput)) {
            setEmailError(true)
            return;
        }
        setEmailError(false) // retorna a cor normal caso o email seja valido
    }

    // validation para onblur password
    const handlePassword = () => {
        if (!passwordInput || passwordInput.length < 5 || passwordInput.length > 20) {
            setPasswordError(true)
            return
        }
        setPasswordError(false)
    }
    


    return (
        <div>

            <p>
                <TextField
                    id='standard-basic2'
                    error={emailError}
                    label="E-mail"
                    value={emailInput}
                    onChange={(event) => setEmailInput(event.target.value)}
                    onBlur={handleEmail}
                    variant="standard"
                    inputProps={{}}
                    fullWidth
                    size="small" />
            </p>
            <p>
                <FormControl sx={{ width: '100%' }} variant="standard">
                    <InputLabel error={passwordError} htmlFor="standard-adornment-password">
                        Senha
                    </InputLabel>
                    <Input
                        fullWidth
                        error={passwordError}
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordInput}
                        onBlur={handlePassword}
                        onChange={(event) => setPasswordInput(event.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </p>

            <p>
                <Button onClick={handleSubmit} fullWidth variant="contained" endIcon={<LoginIcon /> }>
                    Entrar
                </Button>
            </p>
            
                {formValid && (<Alert severity="error">
                    {formValid}
                </Alert>)}

                {success && (<Alert severity="success">
                    {success}
                </Alert>)}


                
            
        </div>
    )
}

