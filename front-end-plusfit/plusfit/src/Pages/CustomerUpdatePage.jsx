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

const validarCPF = validaCPF
export default function CustomerUpdatePage() {

    const [cpfError, setCpfError] = useState(false)
    const [erroGenerico, setErroGenerico] = useState(false)
    const [originalBirthDate, setOriginalBirthDate] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        gender: '',
        birthDate: '',
    })

    const [state, setState] = useState({
        formModified: false,
        showWaiting: false
    })

    const { formModified, showWaiting } = state

    const params = useParams()
    const navigate = useNavigate()

    const { askForConfirmation, ConfirmDialog } = useConfirmDialog();
    const { notify, Notification } = useNotification();

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

    const handleCpf = () => {
        if (!validarCPF(formData.cpf) || !formData.cpf) {
            setCpfError(true)
            return;
        }
        setCpfError(false)
    }
    const handleErroGenerico = () => {
        if (!formData.name || !formData.gender) {
            setErroGenerico(true)
            return
        }
        setErroGenerico(false)

    }

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
            setState({ ...state, data: formData, formModified: true })
        }
    };


    async function handleSubmit(e) {
        e.preventDefault();

        if (cpfError || !formData.cpf) {
            notify('CPF invalido', 'error', 3000)
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

        setState({ ...state, showWaiting: true })

        
        formData.birthDate = originalBirthDate
        
        console.log("Aqui", formData)         
        await axios.put(`http://localhost:8080/customer/${params.id}`, formData, headers)
            .then(() => {
                notify('Cliente atualizado com sucesso.', 'success', 500, () => {
                    navigate('/clientes', { replace: true });
                });

            }).catch(error => {
                console.error(error);
                notify(error.message, 'error');
            })
            .finally(() => {
                setState({ ...state, showWaiting: false })
            });


    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Atualiza o estado com o novo valor do campo alterado
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        setState({ ...state, data: formData, formModified: true })
    };

    async function handleVoltar() {
        if (formModified &&
            ! await askForConfirmation('Tem certeza que deseja sair sem salvar as alterações?'))
            return

        navigate('/clientes')
    }

    useEffect(() => {
        if (params.id) loadData()
    }, [])

    async function loadData() {
        setState({ ...state, showWaiting: true })
        try {
            const result = await axios.get(`http://localhost:8080/customer/${params.id}`)
            const data = result.data
            setOriginalBirthDate(data.birthDate)
            let dateParts = data.birthDate.split('-')
            let formatedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`




            setFormData({
                name: data.name,
                cpf: data.cpf,
                gender: data.gender,
                birthDate: formatedDate,
            });

        } catch (error) {
            console.error(error)
            notify(error.message, 'error')
        }
        finally {
            setState({ ...state, showWaiting: false })
        }



    };

    return (
        <>
            <Waiting show={showWaiting} />
            <ConfirmDialog />
            <Notification />

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
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, padding: '0 24px', mb: 3 }}>
                        <Button type="submit" onClick={handleSubmit} variant="contained" color="primary" sx={{ width: 'auto' }} endIcon={<CreateIcon />}>
                            <Typography>
                                Editar Dados
                            </Typography>
                        </Button>

                        <Button variant="contained" onClick={handleVoltar} color="secondary" sx={{ width: 'auto' }}>
                            Voltar
                        </Button>
                    </Box>
                </form>
            </Paper>
        </>
    )




}