import React from "react";
import { useEffect, useState } from "react";
import { Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Waiting from "../ui/Waiting";

const columns = [
    { field: 'customerId', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nome', width: 230 },
    { field: 'cpf', headerName: 'CPF', width: 230 },
    { field: 'phone_number', headerName: 'Telefone', width: 180 },
    { field: 'email', headerName: 'E-mail', width: 230 },
    {field: 'address', headerName: 'Rua', width: 230},
    {field: 'addressNumber', headerName: 'Numero', width: 70}
];

export default function CustomerList() {
    const [state, setstate] = useState({
        customers: [],
        showWaiting: false
    });
    const {
        customers,
        showWaiting
    } = state

    React.useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {

        setstate({ ...state, showWaiting: true })
        axios.get('http://localhost:3000/customer')
        setstate({ ...state, customers: response.data, showWaiting: false })
    }


    return (
        <>
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
                    maxWidth: '80vw',
                    margin: 'auto',
                }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={customers}
                        columns={columns}
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


