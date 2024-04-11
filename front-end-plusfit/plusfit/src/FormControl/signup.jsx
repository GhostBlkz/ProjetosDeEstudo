import React, {useState} from 'react'
import { 
    TextField, 
    FormControl, 
    Input, 
    InputAdornment, 
    InputLabel, 
    IconButton, 
    Button,  
    Alert,
    Stack } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';


// Email Validation
const isEmail = (email) => //função que valida emails
/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
export default function FormSignup() {


    //Campo de senha
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //Inputs
    const [usernameInput, setUsernameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [passwordConfirmationInput, setPasswordConfirmationInput] = useState('')


    // validaçao do form
    const [formValid, setFormValid] = useState()
    const [sucess, setSucess] = useState()
    

    async function handleSubmit (e) {
        e.preventDefault()
        setSucess(null)

        if(usernameError || !usernameInput){
            setFormValid("Usuario deve conter 5 a 15 caracters")
            return
        }
        if(emailError || !emailInput){
            setFormValid("Email invalido")
            return
        }
        if(passwordError || !passwordInput){
            setFormValid("senha deve ter entre 5 e 20 caracteres")
            return
        }

        if(passwordConfirmationError || !passwordConfirmationInput){
            setFormValid("As senhas devem combinar")
            return
        }

        setFormValid(null)
        setSucess('Conta criada')



        console.log(usernameInput)
        console.log(emailInput)
        console.log(passwordInput)


    }

    // Input Error 
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);


    
    //Validation para onBlur Username
    const handleUsername = () => {
        if(usernameInput.length == 0 || usernameInput.length < 5 || usernameInput.length > 20 ){ 
            setUsernameError(true);
            
            return;
        }
        setUsernameError(false) // retorna a cor normal caso o usuario digitou a quantidade certa
    }

    //Validation para onBlur Email
    const handleEmail = () =>{
        if(!isEmail(emailInput)){
            setEmailError(true)
            return;
        }
        setEmailError(false) // retorna a cor normal caso o email seja valido
    }

    // validation para onblur password
    const handlePassword = () =>{
        if(!passwordInput|| passwordInput.length < 5 || passwordInput.length > 20){
            setPasswordError(true)
            return
        }
            setPasswordError(false)
    }

    // validation para onblur password
    const handlePasswordConfirmation = () =>{
        if(!passwordConfirmationInput|| passwordConfirmationInput != passwordInput ){
            setPasswordConfirmationError(true)
            return
        }
        setPasswordConfirmationError(false)
    }

    return (
        <div>
            
            <p>
                <TextField
                    id='standard-basic1'
                    error={usernameError}
                    label="Nome de usuário"
                    value={usernameInput}
                    onChange={(event) => setUsernameInput(event.target.value)}
                    onBlur={handleUsername}
                    variant="standard"
                    inputProps={{}}
                    fullWidth
                    size="small" />
            </p>
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
                <FormControl sx={{ width: '100%' }} variant="standard">
                    <InputLabel error={passwordError} htmlFor="standard-adornment-password">
                        Confirme a Senha
                    </InputLabel>
                    <Input
                        fullWidth
                        error={passwordConfirmationError}
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordConfirmationInput}
                        onBlur={handlePasswordConfirmation}
                        onChange={(event) => setPasswordConfirmationInput(event.target.value)}
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
                <Button onClick={handleSubmit} fullWidth variant="contained" endIcon={<LoginIcon/>}>
                    Cadastrar
                </Button>
            </p>
            <p>
                {formValid && (<Alert  severity="error">
                    {formValid}
                    </Alert>)}
            </p>
            <p>
                {sucess && (<Alert  severity="success">
                    {sucess}
                    </Alert>)}
            </p>
        </div>
    )
}