import React from 'react'
import InputMask from 'react-input-mask'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, TextField, Grid, Button, Box, Alert, MenuItem } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import validaCPF from '../lib/ValidaCpf'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Waiting from '../ui/Waiting';
import axios from 'axios';

import useConfirmDialog from '../ui/useConfirmDialog';
import useNotification from '../ui/useNotification';



// Email Validation
const isEmail = (email) => //função que valida emails
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);


const validarCPF = validaCPF
export default function CustomerEnrollmentPage() {

  const [emailError, setEmailError] = useState(false);
  const [cpfError, setCpfError] = useState(false)
  const [erroGenerico, setErroGenerico] = useState(false)


  //criando o formulario que sera enviado ao backend
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    gender: '',
    birthDate: '',

    addresses: {
      city: '',
      state: '',
      neighbourhood: '',
      street: '',
      addressNumber: '',
      zipCode: '',

    },
    contact: {
      email: '',
      phoneNumber: ''

    },
    enrollment: {
      planDescription: '',
      status: '',
    },
  }
  );
  const [state, setState] = useState({
    showWaiting: false
  })

  const { showWaiting } = state

  const params = useParams()
  const navigate = useNavigate()

  const { askForConfirmation, ConfirmDialog } = useConfirmDialog();
  const { notify, Notification } = useNotification();






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
  let formatedDate = formData.birthDate.split('/').reverse().join('-');
  const data = {
    name: formData.name,
    cpf: formData.cpf,
    gender: formData.gender,
    birthDate: formatedDate,
    addresses: [
      {
        city: formData.addresses.city,
        state: formData.addresses.state,
        neighbourhood: formData.addresses.neighbourhood,
        street: formData.addresses.street,
        addressNumber: formData.addresses.addressNumber,
        zipCode: formData.addresses.zipCode
      }
    ],
    contact: [
      {
        email: formData.contact.email,
        phoneNumber: formData.contact.phoneNumber
      }
    ],
    enrollment: [
      {
        planDescription: formData.enrollment.planDescription,
        status: formData.enrollment.status
      }
    ],

  }











  //lida com a validação do email
  const handleEmail = () => {
    if (!isEmail(formData.contact.email) || !formData.contact.email) {
      setEmailError(true)
      return;
    }
    setEmailError(false)
  }
  //lida com a validação do cpf
  const handleCpf = () => {
    if (!validarCPF(formData.cpf) || !formData.cpf) {
      setCpfError(true)
      return;
    }
    setCpfError(false)
  }
  //lida com os campos requeridos
  const handleErroGenerico = () => {
    if (!formData.name || !formData.addresses.street ||
      !formData.addresses.neighbourhood || !formData.addresses.addressNumber || !formData.addresses.city ||
      !formData.addresses.state || !formData.gender) {
      setErroGenerico(true)
      return
    }
    setErroGenerico(false)
  }
  //lida com a inserção da data de nascimento
  const handleBirthdate = (e) => {
    const { name, value } = e.target;
    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');

    // Verifica se o valor tem até 8 dígitos (DDMMAAAA)
    if (numericValue.length <= 8) {
      // Formata a data no formato XX/XX/XXXX
      let formattedValue = numericValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');

      // Atualiza o estado com a data formatada
      setFormData(prevState => ({
        ...prevState,
        [name]: formattedValue,
      }));
    }
  };
  // formata a data para o backend com YYYY-MM-DD




  // Função para lidar com mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData) {
      // Atualiza campos diretamente no nível raiz do objeto formData
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name in formData.addresses) {
      // Atualiza campos dentro de 'addresses'
      setFormData(prevState => ({
        ...prevState,
        addresses: {
          ...prevState.addresses,
          [name]: value,
        },
      }));
    } else if (name in formData.contact) {
      // Atualiza campos dentro de 'contact'
      setFormData(prevState => ({
        ...prevState,
        contact: {
          ...prevState.contact,
          [name]: value,
        },
      }));
    } else if (name in formData.enrollment) {
      // Atualiza campos dentro de 'enrollment'
      setFormData(prevState => ({
        ...prevState,
        enrollment: {
          ...prevState.enrollment,
          [name]: value,
        },
      }));
    }
    setState({ ...state, data: formData, formModified: true })
  };



  const handlePhoneNumber = (e) => {
    const { value } = e.target;
    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');
    // Limita o comprimento máximo para 11 dígitos
    const formattedValue = numericValue.slice(0, 11);

    setFormData(prevState => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        phoneNumber: formattedValue,
      },
    }));
  };






  // Função para lidar com a submissão do formulário
  async function handleSubmit(e) {
    e.preventDefault();

    if (cpfError || !formData.cpf) {
      notify('CPF invalido', 'error', 3000)
      return
    }

    if (emailError || !formData.contact.email) {
      notify('Email invalido', 'error', 3000)
      return
    }

    if (erroGenerico) {
      notify('Preencha todos os campos', 'error', 3000)
      return
    }


    // Criar a constante com os dados do cabeçalho
    const headers = {
      'headers': {
        // Indicar que será enviado os dados em formato de objeto
        'Content-Type': 'application/json'
      }
    };
    console.log(data)

    setState({ ...state, showWaiting: true })

    await axios.post(`http://localhost:8080/customer`, data, headers)
      .then((response) => {
        notify('Cliente registrado com sucesso.', 'success', 500, () => {
          navigate('/clientes', { replace: true });
        });

      }).catch((error) => {
        notify(error.message, 'error');
      })
      .finally(() => {
        setState({ ...state, showWaiting: false })
      });




  };

  async function handleVoltar() {

    navigate('/clientes')

  }


  return (

    <>
      <Waiting show={showWaiting} />
      <ConfirmDialog />
      <Notification />

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
                  value={formData.name}
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
                  value={formData.cpf}
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
                  fullWidth
                  value={formData.birthDate}
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
                  value={formData.gender}
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
                  value={formData.contact.email}
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
                  value={formData.contact.phoneNumber}
                  onChange={handlePhoneNumber}
                >
                  {() => (
                    <TextField
                      name="phoneNumber"
                      label="Telefone"
                      variant="outlined"
                      fullWidth
                      value={formData.contact.phoneNumber}
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
                  name="neighbourhood"
                  label="Bairro"
                  variant="outlined"
                  fullWidth
                  value={formData.addresses.neighbourhood}
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
                  value={formData.addresses.street}
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
                  value={formData.addresses.addressNumber}
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
                  value={formData.addresses.city}
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
                  value={formData.addresses.state}
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
                  value={formData.addresses.zipCode}
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
                  value={formData.enrollment.planDescription}
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
                  value={formData.enrollment.status}
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
                <Typography >
                  {params.id ? `Editar cliente #${params.id}` : 'Cadastrar novo cliente'}
                </Typography>
              </Button>
              <Button variant="contained" onClick={handleVoltar} color="secondary" sx={{ width: 'auto' }}>
                Voltar
              </Button>
            </Box>

          </form>

        </Paper>
      </LocalizationProvider>

    </>

  )
}
