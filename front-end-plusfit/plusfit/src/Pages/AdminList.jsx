import React from "react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import { Typography, Box, Paper, IconButton, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddBoxIcon from '@mui/icons-material/AddBox'

import { DataGrid } from "@mui/x-data-grid";

import axios from "axios";
import Waiting from "../ui/Waiting";

export default function AdminList() {
    const columns = [
        { field: 'adminId', headerName: 'ID', width: 70 },
        { field: 'userName', headerName: 'Nome de usuario', width: 260 },
        { field: 'email', headerName: 'E-mail', width: 230 },
        { field: 'active', headerName: 'Status', width: 100, },


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

    ]


    




    const [state, setState] = useState({
        admins: [],
        showWaiting: false
    });

    const {
        customers,
        showWaiting
    } = state

   useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        // Atualiza o estado para mostrar indicador de espera
        setState({ ...state, showWaiting: true })

        try{
            const response = await axios.get('http://localhost:8080/admin')
            console.log(response.data)

    
            const formatatedAdmins = response.data.map((admin) => {
                    return{
                        adminId: admin.adminId,
                        userName: admin.userName,
                        email: admin.email,
                        active: admin.active ? 'Inativo' : 'Ativo',
                    }
                }
            )

            setState({ ...state, admins: formatatedAdmins, showWaiting: false })



        }
        catch(error){
            console.error(error)
            setState({ ...state, showWaiting: true })

        }
    }


    async function handleDeleteButtonClick(id) {
        if (confirm('Tem certeza que deseja deletar este administrador?')) {
            //mostra backdrop
            setState({ ...state, showWaiting: true })
            try {
                await axios.delete(`http://localhost:8080/admin/${id}`)

                //recarrega grid
                fetchData()

                alert('admin deletado com sucesso.')
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
                Lista de clientes
            </Typography>

            <Paper elevation={6}
                sx={{
                    padding: '24px',
                    maxWidth: '70%',
                    margin: 'auto',
                }}>
                <Box sx={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={state.admins}
                        columns={columns}
                        getRowId={(row) => row.adminId}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 7,
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