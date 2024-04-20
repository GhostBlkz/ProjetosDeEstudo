import React from 'react'
import { useState, useEffect } from 'react';
import { Typography, Paper, TextField, Grid, Button, Box, Alert } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import validaCPF from '../lib/ValidaCpf'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb'


// Email Validation
const isEmail = (email) => //função que valida emails
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);


const validarCPF = validaCPF
export default function CustomerEnrollmentPage() {

  const [formValid, setFormValid] = useState()
  const [emailError, setEmailError] = useState(false);
  const [cpfError, setCpfError] = useState(false)
  const [success, setSuccess] = useState(false)

  




  const [formData, setFormData] = useState({
    fullName: '',
    idt_number: '',
    address: '',
    address_number: '',
    city: '',
    state: '',
    zip_code: '',
    birthdate: null,
    email: '',
  });

  //lida com a validação do email
  const handleEmail = () => {
    if (!isEmail(formData.email) || !formData.email) {
      setEmailError(true)
      return;
    }
    setEmailError(false)
    setFormValid("")
  }

  const handleCpf = () => {
    if (!validarCPF(formData.idt_number) || !formData.idt_number) {
      setCpfError(true)
      return;
    }
    setCpfError(false)
    setFormValid("")
  }
  //lida com a inserção da data de nascimento
  const handleBirthdateChange = (newValue) => {
    setFormData(prevState => ({
      ...prevState,
      birthdate: newValue,
    }));
  };

  // Função para lidar com mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  // Função para lidar com a submissão do formulário
  async function handleSubmit(e) {
    e.preventDefault();

    if (cpfError || !formData.idt_number) {
      setFormValid("CPF invalido")
      setSuccess(false)
      return
    }

    if (emailError || !formData.email) {
      setFormValid("Email invalido")
      setSuccess(false)
      return
    }

    setSuccess(true)
    console.log(formData);
    console.log("Data de Nascimento formatada:", formData.birthdate ? dayjs(formData.birthdate).format('DD/MM/YYYY') : null);
  };

  function handleVoltar() {
    window.location.href = "/"
  }

//seta um timeout para o alert de erro
  useEffect(() => {
    if (formValid) {
      const formValidTimeout = setTimeout(() => {
        setFormValid(false);
      }, 2000);
      
      return () => clearTimeout(formValidTimeout);
    }
  }, [formValid]);

//seta um timeout para o alert de sucesso
  useEffect(() => {
    if (success) {
      const successTimeout = setTimeout(() => {
        setSuccess(false);
      }, 2000);
      
      return () => clearTimeout(successTimeout);
    }
  }, [success]);

  return (

    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <Paper elevation={6}
          sx={{
            padding: '24px',
            maxWidth: '60vw',
            margin: 'auto',
          }}>
          <Typography variant='h4' sx={{
            mb: 3,
            justifyContent: 'auto',
            textAlign: 'center'

          }}>
            Insira os dados
          </Typography>

          <form>
            <Grid container columnSpacing={3} rowSpacing={2}>

              <Grid item xs={6} md={8}>
                <TextField
                  name="fullName"
                  label="Nome Completo"
                  variant="outlined"
                  fullWidth
                  value={formData.fullName}
                  onChange={handleChange}
                  sx={{
                    borderRadius: 10,
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  name="idt_number"
                  label="CPF"
                  variant="outlined"
                  fullWidth
                  error={cpfError}
                  value={formData.idt_number}
                  onChange={handleChange}
                  onBlur={handleCpf}
                  sx={{
                    borderRadius: 10,
                  }}
                />
              </Grid>

              <Grid item xs={6} md={8}>
                <TextField
                  name="address"
                  label="Endereço"
                  variant="outlined"
                  fullWidth
                  value={formData.address}
                  onChange={handleChange}
                  sx={{
                    borderRadius: 10,
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  name="address_number"
                  label="numero"
                  variant="outlined"
                  fullWidth
                  value={formData.address_number}
                  onChange={handleChange}
                  sx={{
                    borderRadius: 10,
                    width: 120

                  }}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  name="city"
                  label="Cidade"
                  variant="outlined"
                  fullWidth
                  value={formData.city}
                  onChange={handleChange}
                  sx={{
                    borderRadius: 10,
                  }}
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <TextField
                  name="state"
                  label="Estado"
                  variant="outlined"
                  fullWidth
                  value={formData.state}
                  onChange={handleChange}
                  sx={{
                    borderRadius: 10,
                  }}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  name="zip_code"
                  label="CEP"
                  variant="outlined"
                  fullWidth
                  value={formData.zip_code}
                  onChange={handleChange}
                  sx={{
                    borderRadius: 10,
                    width: 304
                  }}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <DatePicker
                  name="birthdate"
                  label="Data de Nascimento"
                  inputVariant="outlined"
                  fullWidth
                  value={formData.birthdate}
                  onChange={handleBirthdateChange}
                  slotProps={<TextField variant='outlined' />}
                  sx={{
                    borderRadius: 10,
                    width: 343
                  }}
                />
              </Grid>

              <Grid item xs={6} md={8}>
                <TextField
                  name="email"
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                  error={emailError}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleEmail}
                  sx={{
                    borderRadius: 10,

                  }}
                />
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, padding: '0 24px', mb: 3 }}>
                <Button type="submit" onClick={handleSubmit} variant="contained" color="primary" sx={{ width: 'auto' }} endIcon={<CreateIcon />}>
                  Cadastrar
                </Button>
                <Button variant="contained" onClick={handleVoltar} color="secondary" sx={{ width: 'auto', position: 'absolute', right: 400 }}>
                  Voltar
                </Button>
              </Box>



            </Grid>
          </form>
          {formValid && (<Alert severity="error" sx={{ textAlign: 'center', margin: 'auto', width: '100%' }}>
            {formValid}
          </Alert>)}

          {success && (<Alert severity="success" sx={{ textAlign: 'center', margin: 'auto', width: '100%' }}>
            {"Cadastro realizado com sucesso"}
          </Alert>)}

        </Paper>
      </LocalizationProvider>

    </>

  )
}
