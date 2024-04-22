import React from 'react'
import InputMask from 'react-input-mask'
import { useState, useEffect } from 'react';
import { Typography, Paper, TextField, Grid, Button, Box, Alert, MenuItem } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import validaCPF from '../lib/ValidaCpf'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Waiting from '../ui/Waiting';
import axios from 'axios';



// Email Validation
const isEmail = (email) => //função que valida emails
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);


const validarCPF = validaCPF
export default function CustomerEnrollmentPage() {

  const [formValid, setFormValid] = useState()
  const [emailError, setEmailError] = useState(false);
  const [cpfError, setCpfError] = useState(false)
  const [erroGenerico, setErroGenerico] = useState(false)
  const [success, setSuccess] = useState(false)

  //opções de seleção de genero
  const genders = [
    {
      value: 'Male',
      label: 'Masculino',
    },
    {
      value: 'Female',
      label: 'Feminino',
    },
    {
      value: 'Other',
      label: 'Outro',
    }
  ]
  //opções de plano
  const statusPlan = [
    { value: 'ACTIVE', label: 'Ativo' },
    { value: 'INACTIVE', label: 'Inativo' },
    { value: 'CANCELLED', label: 'Cancelado' },
    { value: 'SUSPENDED', label: 'Suspenso' }
  ]
  //opçes de seleção de estado
  const states = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' }
  ]




  //criando o formulario que sera enviado ao backend
  const [formData, setFormData] = useState({
    customers: {

      name: '',
      cpf: '',
      gender: '',
      birthDate: '',

      addresses: {
        city: '',
        state: '',
        neighborhood: '',
        street: '',
        addressNumber: '',
        zipCode: '',

      },
      contact: {
        email: '',
        phone_number: ''

      },
      enrollment: {
        planDescription: '',
        status: '',
      },
    }
  });

  //Backdrop de espera
  const [state, setState] = React.useState({
    showWaiting: false
  })
  const { showWaiting } = state

  //lida com a validação do email
  const handleEmail = () => {
    if (!isEmail(formData.customers.contact.email) || !formData.customers.contact.email) {
      setEmailError(true)
      return;
    }
    setEmailError(false)
    setFormValid("")
  }
  //lida com a validação do cpf
  const handleCpf = () => {
    if (!validarCPF(formData.customers.cpf) || !formData.customers.cpf) {
      setCpfError(true)
      return;
    }
    setCpfError(false)
    setFormValid("")
  }
  //lida com os campos requeridos
  const handleErroGenerico = () => {
    if (!formData.customers.name || !formData.customers.addresses.street ||
      !formData.customers.addresses.neighborhood || !formData.customers.addresses.addressNumber || !formData.customers.addresses.city ||
      !formData.customers.addresses.state || !formData.customers.gender) {
      setErroGenerico(true)
      return
    }
    setErroGenerico(false)
    setFormValid("")
  }
  //lida com a inserção da data de nascimento
  const handleBirthdate = (e) => {
    const { value } = e.target;
    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');

    // Verifica se o valor tem até 8 dígitos (DDMMAAAA)
    if (numericValue.length <= 8) {
      // Formata a data no formato XX/XX/XXXX
      let formattedValue = numericValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');

      // Atualiza o estado com a data formatada
      setFormData(prevState => ({
        ...prevState,
        customers: {
          ...prevState.customers,
          birthDate: formattedValue,
        },
      }));
    }
  };

  // Função para lidar com mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.customers.contact) {
      // Atualiza campos dentro de 'contact'
      setFormData(prevState => ({
        ...prevState,
        customers: {
          ...prevState.customers,
          contact: {
            ...prevState.customers.contact,
            [name]: value,
          },
        },
      }));
    } else if (name in formData.customers.addresses) {
      // Atualiza campos dentro de 'addresses'
      setFormData(prevState => ({
        ...prevState,
        customers: {
          ...prevState.customers,
          addresses: {
            ...prevState.customers.addresses,
            [name]: value,
          },
        },
      }));
    } else if (name in formData.customers.enrollment) {
      // Atualiza campos dentro de 'enrollment'
      setFormData(prevState => ({
        ...prevState,
        customers: {
          ...prevState.customers,
          enrollment: {
            ...prevState.customers.enrollment,
            [name]: value,
          },
        },
      }));
    } else {
      // Para campos diretamente dentro de 'customers'
      setFormData(prevState => ({
        ...prevState,
        customers: {
          ...prevState.customers,
          [name]: value,
        },
      }));
    }
  };



  const handlePhoneNumber = (e) => {
    const { value } = e.target;
    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');
    // Limita o comprimento máximo para 11 dígitos
    const formattedValue = numericValue.slice(0, 11);

    setFormData(prevState => ({
      ...prevState,
      customers: {
        ...prevState.customers,
        contact: {
          ...prevState.customers.contact,
          phone_number: formattedValue,
        },
      },
    }));
  };


  // Função para lidar com a submissão do formulário
  async function handleSubmit(e) {
    e.preventDefault();

    if (cpfError || !formData.customers.cpf) {
      setFormValid("CPF invalido")
      setSuccess(false)
      return
    }

    if (emailError || !formData.customers.contact.email) {
      setFormValid("Email invalido")
      setSuccess(false)
      return
    }
    if (erroGenerico) {
      setFormValid("Preencha todos os campos requeridos")
      setSuccess(false)
      return
    }

    
    console.log(formData);

  // Declarar uma nova variável dados com state e atribuir o objeto
    const data = {
      customers: formData
    }

    // Criar a constante com os dados do cabeçalho
    const headers = {
      'headers': {
          // Indicar que será enviado os dados em formato de objeto
          'Content-Type': 'application/json'
      }
  };

  setState({...state, showWaiting: true})
  axios.post('http://localhost:8080/customer', data, headers)
  .then((response) => {

    setSuccess(true)
    setState({...state, showWaiting: false})
  })
  .catch((err) => {
    setSuccess(false)
    console.log('Log de erro: ' + err)

    if (err.response){
      setFormValid(err.response.data.message)
      setState({...state, showWaiting: false})

    } else {
      setFormValid("Ocorreu um erro")
      setState({...state, showWaiting: false})

    }
  })

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
                  required
                  name="name"
                  label="Nome Completo"
                  variant="outlined"
                  fullWidth
                  value={formData.customers.name}
                  onChange={handleChange}
                  onBlur={handleErroGenerico}
                  sx={{
                    borderRadius: 10,
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  required
                  name="cpf"
                  label="CPF"
                  variant="outlined"
                  fullWidth
                  error={cpfError}
                  value={formData.customers.cpf}
                  onChange={handleChange}
                  onBlur={handleCpf}
                  sx={{
                    borderRadius: 10,
                  }}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  required
                  name="birthDate"
                  label="Data de Nascimento"
                  helperText="DD/MM/YYYY"
                  inputVariant="outlined"
                  fullWidth
                  value={formData.customers.birthDate}
                  onChange={handleBirthdate}
                  slotProps={<TextField variant='outlined' />}
                  sx={{
                    borderRadius: 10,
                    width: 343
                  }}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  required
                  name="gender"
                  select
                  label="Selecione seu genero"
                  variant="outlined"
                  defaultValue={""}
                  value={formData.customers.gender}
                  onChange={handleChange}
                  onBlur={handleErroGenerico}
                  fullWidth
                  sx={{
                    borderRadius: 10,

                  }}
                >
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6} md={8}>
                <TextField
                  required
                  name="email"
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                  error={emailError}
                  value={formData.customers.contact.email}
                  onChange={handleChange}
                  onBlur={handleEmail}
                  sx={{
                    borderRadius: 10,

                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <InputMask
                  mask="(99) 99999-9999"
                  maskChar=" "
                  value={formData.customers.contact.phone_number}
                  onChange={handlePhoneNumber}
                >
                  {() => (
                    <TextField
                      name="phone_number"
                      label="Telefone"
                      variant="outlined"
                      fullWidth
                      value={formData.customers.contact.phone_number}
                      sx={{
                        borderRadius: 10,
                      }}
                    />
                  )}
                </InputMask>
              </Grid>

              <Grid item xs={6} md={8}>
                <TextField
                  required
                  name="neighborhood"
                  label="Bairro"
                  variant="outlined"
                  fullWidth
                  value={formData.customers.addresses.neighborhood}
                  onChange={handleChange}
                  onBlur={handleErroGenerico}
                  sx={{
                    borderRadius: 10,
                  }}
                />
              </Grid>

              <Grid item xs={6} md={8}>
                <TextField
                  required
                  name="street"
                  label="Rua"
                  variant="outlined"
                  fullWidth
                  value={formData.customers.addresses.street}
                  onChange={handleChange}
                  onBlur={handleErroGenerico}
                  sx={{
                    borderRadius: 10,
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  required
                  name="addressNumber"
                  label="Número"
                  variant="outlined"
                  fullWidth
                  value={formData.customers.addresses.addressNumber}
                  onChange={handleChange}
                  onBlur={handleErroGenerico}
                  sx={{
                    borderRadius: 10,
                    width: 120

                  }}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  required
                  name="city"
                  label="Cidade"
                  variant="outlined"
                  fullWidth
                  value={formData.customers.addresses.city}
                  onChange={handleChange}
                  onBlur={handleErroGenerico}
                  sx={{
                    borderRadius: 10,
                  }}
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <TextField
                  required
                  name="state"
                  select
                  label="Estado"
                  variant="outlined"
                  defaultValue={""}
                  fullWidth
                  value={formData.customers.addresses.state}
                  onChange={handleChange}
                  onBlur={handleErroGenerico}
                  sx={{
                    borderRadius: 10,
                  }}
                >
                  {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  name="zipCode"
                  label="CEP"
                  variant="outlined"
                  fullWidth
                  value={formData.customers.addresses.zipCode}
                  onChange={handleChange}
                  sx={{
                    borderRadius: 10,
                    width: 304
                  }}
                />
              </Grid>

              <Grid item xs={6} md={8}>
                <TextField
                  name="planDescription"
                  label="Objetivo do Plano"
                  variant="outlined"
                  fullWidth
                  value={formData.customers.enrollment.planDescription}
                  onChange={handleChange}
                  sx={{
                    borderRadius: 10,
                  }}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  name="status"
                  select
                  label="Status do Plano"
                  variant="outlined"
                  defaultValue={""}
                  value={formData.customers.enrollment.status}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    borderRadius: 10,

                  }}
                >
                  {statusPlan.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>


            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, padding: '0 24px', mb: 3 }}>
              <Button type="submit" onClick={handleSubmit} variant="contained" color="primary" sx={{ width: 'auto' }} endIcon={<CreateIcon />}>
                Cadastrar
              </Button>
              <Button variant="contained" onClick={handleVoltar} color="secondary" sx={{ width: 'auto' }}>
                Voltar
              </Button>
            </Box>

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
