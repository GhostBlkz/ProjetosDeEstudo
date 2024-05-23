import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, TextField, Grid, Button, Box, Alert, MenuItem } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import Waiting from '../ui/Waiting';
import axios from 'axios';

import useConfirmDialog from '../ui/useConfirmDialog';
import useNotification from '../ui/useNotification';

export default function EnrollmentUpdate() {

    const [formData, setFormData] = useState({
        planDescription: '',
        status: ''
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

    const statusPlan = [
        { value: 'ACTIVE', label: 'Ativo' },
        { value: 'INACTIVE', label: 'Inativo' },
        { value: 'CANCELLED', label: 'Cancelado' },
        { value: 'SUSPENDED', label: 'Suspenso' }
    ]

    

    async function handleSubmit(e) {
        e.preventDefault();

        // Criar a constante com os dados do cabeçalho
        const headers = {
            'headers': {
                // Indicar que será enviado os dados em formato de objeto
                'Content-Type': 'application/json'
            }
        };
        console.log("formData ",formData)
        setState({ ...state, showWaiting: true })
        
        try {
            await axios.put(`http://localhost:8080/customer/${params.id}/enrollment/${params.id}`, formData, headers)
                .then(() => {
                    notify('Cliente atualizado com sucesso.', 'success', 500, () => {
                        navigate('/clientes', { replace: true });
                    });
                    

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

    const handleChange = (e) => {
        const { name, value } = e.target
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


            setFormData({
                planDescription: data.enrollment[0].planDescription,
                status: data.enrollment[0].status,
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
                <form >
                    <Grid container columnSpacing={3} rowSpacing={2}>
                        <Grid item xs={6} md={8}>
                            <TextField
                                name="planDescription"
                                label="Objetivo do Plano"
                                variant="outlined"
                                fullWidth
                                value={formData.planDescription}
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
                                value={formData.status}
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
                            <Typography>
                                Editar Plano
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