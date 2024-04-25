import React from "react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import { Typography, Box, Paper, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { DataGrid } from "@mui/x-data-grid";

import axios from "axios";
import Waiting from "../ui/Waiting";


const columns = [
    { field: 'customerId', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nome', width: 260 },
    { field: 'cpf', headerName: 'CPF', width: 230 },
    { field: 'address', headerName: 'Rua', width: 230,},
    { field: 'addressNumber', headerName: 'Numero', width: 70 },
    { field: 'phoneNumber', headerName: 'Telefone', width: 180 },
    { field: 'email', headerName: 'E-mail', width: 230 },
    { field: 'status', headerName: 'Status do Plano', width: 70 },
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
                    <EditIcon />
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
                <DeleteForeverIcon color="error" />
            </IconButton>
        )
    },

];

export default function CustomerList() {
    // Estado inicial do componente, contendo os clientes e o indicador de espera
    const [state, setstate] = useState({
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
        setstate({ ...state, showWaiting: true })
        try {
            // Realiza a requisição GET para obter os dados dos clientes
            const response = await axios.get('http://localhost:8080/customer')
            console.log(response.data)
            // Formata os dados dos clientes para exibição no DataGrid
            const formattedCustomers = response.data.map(customer => ({
                customerId: customer.customerId,
                name: customer.name,
                cpf: customer.cpf,
                address: customer.addresses.length > 0 ? `${customer.addresses[0].street}, ${customer.addresses[0].addressNumber}` : '',
                phoneNumber: customer.contact.length > 0 ? customer.contact[0].phoneNumber : '',
                email: customer.contact.length > 0 ? customer.contact[0].email : '',
                status: customer.enrollment.length > 0 ? customer.enrollment[0].status : ''
            }));
            // Atualiza o estado com os clientes formatados e remove o indicador de espera
            setstate({ ...state, customers: formattedCustomers, showWaiting: false })
        }
        catch(error){
            // Em caso de erro, exibe o erro no console e remove o indicador de espera
            console.error('Erro obtendo dados:', error)
            setstate({ ...state, showWaiting: false })
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



