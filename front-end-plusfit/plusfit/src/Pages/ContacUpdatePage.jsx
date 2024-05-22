import React from 'react'
import InputMask from 'react-input-mask'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, TextField, Grid, Button, Box, Alert, MenuItem } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import Waiting from '../ui/Waiting';
import axios from 'axios';

import useConfirmDialog from '../ui/useConfirmDialog';
import useNotification from '../ui/useNotification';

// Email Validation
const isEmail = (email) => //função que valida emails
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function ContactUpdatePage() {

    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: ''
    })
    const [emailError, setEmailError] = useState(false);

    const params = useParams()
    const navigate = useNavigate()

    const { askForConfirmation, ConfirmDialog } = useConfirmDialog();
    const { notify, Notification } = useNotification();

    const [state, setState] = useState({
        formModified: false,
        showWaiting: false
    })

    const { formModified, showWaiting } = state


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
    }
    const handleEmail = () => {
        if (!isEmail(formData.email) || !formData.email) {
            setEmailError(true)
            return;
        }
        setEmailError(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Atualiza o estado com o novo valor do campo alterado
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    async function handleVoltar() {
        if (formModified && 
          ! await askForConfirmation('Tem certeza que deseja sair sem salvar as alterações?'))
          return 
    
          navigate('/clientes')
        
      }

    async function handleSubmit(e) {
        e.preventDefault();



        if (emailError || !formData.email) {
            notify('Email invalido', 'error', 3000)
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
        try {
            await axios.put(`http://localhost:8080/customer/contact/${params.id}`, data, headers)
                .then(() => {
                    notify('Cliente atualizado com sucesso.', 'success', 2000, () => {
                        navigate('/clientes', { replace: true });
                    });
                    console.log(data)

                })

        }
        catch (error) {
            console.error(error)

            notify(error.message, 'error')
        }
        finally {
            setState({ ...state, showWaiting: false })
        }

    };


    useEffect(() => {
        if (params.id) loadData()
    }, [])

    async function loadData() {
        setState({ ...state, showWaiting: true })
        try {
            const result = await axios.get(`http://localhost:8080/customer/${params.id}`)
            const data = result.data


            setFormData({
                email: data.contact[0].email,
                phoneNumber: data.contact[0].phoneNumber
            });

        } catch (error) {
            console.error(error)
            notify(error.message, 'error')
        }
        finally {
            setState({ ...state, showWaiting: false })
        }
    }




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

                        <Grid item xs={4}>
                            <InputMask
                                mask="(99) 99999-9999"
                                maskChar=" "
                                value={formData.phoneNumber}
                                onChange={handlePhoneNumber}
                            >
                                {() => (
                                    <TextField
                                        name="phoneNumber"
                                        label="Telefone"
                                        variant="outlined"
                                        fullWidth
                                        value={formData.phoneNumber}
                                        sx={{
                                            borderRadius: 10,
                                        }}
                                    />
                                )}
                            </InputMask>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, padding: '0 24px', mb: 3 }}>
                        <Button type="submit" onClick={handleSubmit} variant="contained" color="primary" sx={{ width: 'auto' }} endIcon={<CreateIcon />}>
                            <Typography>
                                "Editar Contato"
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
