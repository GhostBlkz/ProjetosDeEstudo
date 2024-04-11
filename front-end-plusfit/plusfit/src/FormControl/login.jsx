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
import { useNavigate } from 'react-router-dom';
import AuthUSerContext from '../Contexts/AuthUserContext';
import Notification from '../ui/Notification';
import Waiting from '../ui/Waiting';





// Email Validation
const isEmail = (email) => //função que valida emails
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
export default function FormLogin() {

    
    
    //Campo de senha
    const [showPassword, setShowPassword] = React.useState(false);
    //const {setAuthUser} = React.useContext(AuthUSerContext)
    const navigate = useNavigate()
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
   
    //Notificações e Waiting
    const [state, setState] = React.useState({
        showWaiting: false,
        notif: {
            show: false,
            message: '',
            severity: 'success',
            timeout: 1500
        }
    })
    const { showWaiting, notif } = state
    
    //Inputs

    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')



    // validaçao do form
    const [formValid, setFormValid] = useState()
    


    async function handleSubmit(e) {
        e.preventDefault() //impede o reload da pagina
        


        if (emailError || !emailInput) {
            setFormValid("E-mail ou senha invalidos")
            return
        }
        if (passwordError || !passwordInput) {
            setFormValid("E-mail ou senha invalidos")
            return
        }



        setFormValid(null)
        

        /* if (success){ 
            try {
            //exibe o backdrop de espera
                setState({...state, showWaiting: true})

            const response = await myfetch.post('/users/login', {email, password})
            //console.log(response)
    
            //armazena o token no localStorage (Inseguro isso é provisorio)
            window.localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_NAME, response. token)
    
           // armazena as informações do usuario autenticado no contexto
           //AuthUserContext
           setAuthUser(response.user)
    
                */
            //Mostra notificação de sucesso
            setState({...state, showWaiting: false, notif: {
            show:true,
            message: 'Autenticação efetuada com sucesso.',
            severity: 'success',
            timeout: 1500
        }})

        /*
           
            //TODO: redirecionar para homePage
        }
        catch(error){
            console.error(error)

            //Mostra a Notificação de erro
            setState({...state, showWaiting: false, notif: {
            show:true,
            message: error.message,
            severity: 'error',
            timeout: 4000
        }})
    
            
        }
    } */




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

    function handleNotificationClose() {
        const status = notif.severity

        //fecha a barra de notificação
        setState({
            ...state, notif: {
                show: false,
                severity: status,
                message: '',
                timeout: 1500

            }
        })
        //muda de pagina apos login bem sucedido
        if(status === "success") navigate('/criar_ficha')
        }



        return (
            <div>
                <Waiting show={showWaiting} />

                

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
                    <Button onClick={handleSubmit} fullWidth variant="contained" endIcon={<LoginIcon />}>
                        Entrar
                    </Button>
                </p>

                <Notification
                    show={notif.show}
                    severity={notif.severity}
                    message={notif.message}
                    timeout={notif.timeout}
                    onClose={handleNotificationClose}
                />
              

                




            </div>
        )
    }

