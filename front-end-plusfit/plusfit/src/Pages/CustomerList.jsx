import React from "react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import { Typography, Box, Paper, IconButton, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox'

import { DataGrid } from "@mui/x-data-grid";

import axios from "axios";
import Waiting from "../ui/Waiting";



export default function CustomerList() {

    const columns = [
        { field: 'customerId', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nome', width: 260 },
        { field: 'cpf', headerName: 'CPF', width: 120 },
        { field: 'active', headerName: 'Cliente', width: 100, },
        { field: 'address', headerName: 'Rua', width: 230, },
        { field: 'addressNumber', headerName: 'Numero', width: 70 },
        { field: 'phoneNumber', headerName: 'Telefone', width: 120 },
        { field: 'email', headerName: 'E-mail', width: 230 },
        { field: 'status', headerName: 'Plano', width: 70 },
        {
            field: '_edit',
            headerName: 'Editar',
            headerAlign: 'center',
            align: 'center',
            sortable: 'false',
            width: 90,
            renderCell: params => (
                <Link to={`./${params.id}`}>
                    <IconButton aria-label="Editar">
                        <EditIcon color="secondary"/>
                    </IconButton>
                </Link>
            )
        },

        {
            field: '_delete',
            headerName: 'Excluir',
            headerAlign: 'center',
            align: 'center',
            sortable: 'false',
            width: 90,
            renderCell: params => (
                <IconButton aria-label="Excluir" onClick={() => handleDeleteButtonClick(params.id)}>
                    <DeleteIcon color="error" />
                </IconButton>
            )
        },

    ];
    // Estado inicial do componente, contendo os clientes e o indicador de espera
    const [state, setState] = useState({
        customers: [],
        showWaiting: false
    });

    // Extrair os estados customers e showWaiting de state
    const {
        customers,
        showWaiting
    } = state

    // Efeito utilizado para carregar os dados dos clientes quando o componente é montado
    React.useEffect(() => {
        fetchData()
    }, [])

    // Função assíncrona para buscar os dados dos clientes da API
    async function fetchData() {
        // Atualiza o estado para mostrar indicador de espera
        setState({ ...state, showWaiting: true })
        try {
            // Realiza a requisição GET para obter os dados dos clientes
            const response = await axios.get('http://localhost:8080/customer')
            console.log(response.data)

            const statusMapping = {
                ACTIVE: 'Ativo',
                INACTIVE: 'Inativo',
                CANCELLED: 'Cancelado',
                SUSPENDED: 'Suspenso'
            };

            // Formata os dados dos clientes para exibição no DataGrid
            const formattedCustomers = response.data.map(customer => {

                const status = customer.enrollment.length > 0 ? customer.enrollment[0].status : '';
                const formattedStatus = statusMapping[status] || status;

                return {
                customerId: customer.customerId,
                name: customer.name,
                cpf: customer.cpf,
                active: customer.active ? 'Ativo' : 'Inativo',
                address: customer.addresses.length > 0 ? customer.addresses[0].street : '',
                addressNumber: customer.addresses.length > 0 ? customer.addresses[0].addressNumber : '',
                phoneNumber: customer.contact.length > 0 ? customer.contact[0].phoneNumber : '',
                email: customer.contact.length > 0 ? customer.contact[0].email : '',
                status: formattedStatus

                }
                
            });
            // Atualiza o estado com os clientes formatados e remove o indicador de espera
            setState({ ...state, customers: formattedCustomers, showWaiting: false })
        }
        catch (error) {
            // Em caso de erro, exibe o erro no console e remove o indicador de espera
            console.error('Erro obtendo dados:', error)
            setState({ ...state, showWaiting: false })
        }
    }

    async function handleDeleteButtonClick(id) {
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            //mostra backdrop
            setState({ ...state, showWaiting: true })
            try {
                await axios.delete(`http://localhost:8080/customer/${id}`)

                //recarrega grid
                fetchData()

                alert('Item Inativado com sucesso.')
                //esconde backdrop
                setState({ ...state, showWaiting: false })

            } catch (error) {
                console.error(error)
                setState({ ...state, showWaiting: false })

            }

        }
    }


    return (
        <>
            <Waiting show={showWaiting} />

            <Typography variant='h4' gutterBottom sx={{
                mb: 3,
                justifyContent: 'auto',
                textAlign: 'center',

            }}>
                Listagem de clientes
            </Typography>

            <Box sx={{
                display: 'flex',
                justifyContent: 'right',
                mb: 2   // marginBottom
            }}>
                <Link to="/cadastrar_cliente">
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        startIcon={<AddBoxIcon />}
                    >
                        Novo cliente
                    </Button>
                </Link>
            </Box>




            <Paper elevation={6}
                sx={{
                    padding: '24px',
                    maxWidth: '100%',
                    margin: 'auto',
                }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={state.customers}
                        columns={columns}
                        getRowId={(row) => row.customerId}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                    />
                </Box>
            </Paper>
        </>
    )
}



