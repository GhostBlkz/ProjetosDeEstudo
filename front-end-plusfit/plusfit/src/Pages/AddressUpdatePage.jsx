import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, TextField, Grid, Button, Box, Alert, MenuItem } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import Waiting from '../ui/Waiting';
import useConfirmDialog from '../ui/useConfirmDialog';
import useNotification from '../ui/useNotification';
import axios from 'axios';
export default function AddressUpdatePage() {

    const [formData, setFormData] = useState({
        city: '',
        state: '',
        neighbourhood: '',
        street: '',
        addressNumber: '',
        zipCode: '',
    })

    const [erroGenerico, setErroGenerico] = useState(false)

    const [state, setState] = useState({
        formModified: false,
        showWaiting: false
    })

    const { formModified, showWaiting } = state

    const params = useParams()
    const navigate = useNavigate()

    const { askForConfirmation, ConfirmDialog } = useConfirmDialog();
    const { notify, Notification } = useNotification();

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


    const handleErroGenerico = () => {
        if (!formData.street ||
            !formData.neighbourhood || !formData.addressNumber || !formData.city ||
            !formData.state) {
            setErroGenerico(true)
            return
        }
        setErroGenerico(false)
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

    

    async function handleSubmit(e) {
        e.preventDefault();



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
        try {
            await axios.put(`http://localhost:8080/customer/${params.id}/address/${params.id}`, formData, headers)
                .then(() => {
                    notify('Cliente atualizado com sucesso.', 'success', 500, () => {
                        navigate('/clientes', { replace: true });
                    });
                    console.log(formData)

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
                city: data.addresses[0].city,
                state: data.addresses[0].state,
                neighbourhood: data.addresses[0].neighbourhood,
                street: data.addresses[0].street,
                addressNumber: data.addresses[0].addressNumber,
                zipCode: data.addresses[0].zipCode,
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
                                name="neighbourhood"
                                label="Bairro"
                                variant="outlined"
                                fullWidth
                                value={formData.neighbourhood}
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
                                value={formData.street}
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
                                value={formData.addressNumber}
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
                                value={formData.city}
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
                                value={formData.state}
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
                                value={formData.zipCode}
                                onChange={handleChange}
                                sx={{
                                    borderRadius: 10,
                                    width: 304
                                }}
                            />
                        </Grid>

                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, padding: '0 24px', mb: 3 }}>
                        <Button type="submit" onClick={handleSubmit} variant="contained" color="primary" sx={{ width: 'auto' }} endIcon={<CreateIcon />}>
                            <Typography>
                                Editar Endereços
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