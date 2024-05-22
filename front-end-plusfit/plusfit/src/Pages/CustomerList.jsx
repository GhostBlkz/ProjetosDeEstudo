import React from "react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import { Typography, Box, Paper, IconButton, Button, Menu, MenuItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
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
            renderCell: params => {
                const [anchorEl, setAnchorEl] = useState(null);
                const open = Boolean(anchorEl);

                const handleClick = (event) => {
                    setAnchorEl(event.currentTarget);
                };
                const handleClose = () => {
                    setAnchorEl(null);
                };
                return (
                    <>
                        <IconButton
                            aria-label="Editar"
                            aria-controls={open ? 'edit-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            >
                       
                            <EditIcon color="secondary" />
                        </IconButton>
                        <Menu
                            id="edit-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'edit-menu',
                            }}
                        >
                            <MenuItem
                                component={Link}
                                to={`/cadastrar_cliente/${params.id}`}
                                onClick={handleClose}>
                                Dados do Cliente
                            </MenuItem>

                            <MenuItem
                                component={Link}
                                to={`/atualizar_contatos/${params.id}`}
                                onClick={handleClose}>
                                Contatos
                            </MenuItem>

                            <MenuItem
                                component={Link}
                                to={`/atualizar_matricula/${params.id}`}
                                onClick={handleClose}>
                                Dados da Matricula
                            </MenuItem>

                            <MenuItem
                                component={Link}
                                to={`/atualizar_endereco/${params.id}`}
                                onClick={handleClose}>
                                Endereços
                            </MenuItem>



                        </Menu>
                    </>
                )




            }

        },
        {
            field: '_training',
            headerName: 'Criar Ficha',
            headerAlign: 'center',
            align: 'center',
            sortable: 'false',
            width: 90,
            renderCell: params => (
                <Link to={'/criar_ficha'}>
                    <IconButton aria-label="Criar Ficha" onClick={() => handleCreateFichaButtonClick(params.row.name, params.id)}>
                        <CreateNewFolderIcon color="secondary" />
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
    //salva o nome e o id do cliente no localstorage para criação da ficha
    function handleCreateFichaButtonClick(name, id) {
        localStorage.setItem('name', name);
        localStorage.setItem('customerId', id)
    }

    async function handleDeleteButtonClick(id) {
        if (confirm('Tem certeza que deseja inativar este cliente?')) {
            //mostra backdrop
            setState({ ...state, showWaiting: true })
            try {
                await axios.delete(`http://localhost:8080/customer/${id}`)

                //recarrega grid
                fetchData()

                alert('Cliente Inativado com sucesso.')
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
                <Box sx={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={state.customers}
                        columns={columns}
                        getRowId={(row) => row.customerId}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 7,
                                },
                            },
                        }}
                        pageSizeOptions={[7]}
                    />
                </Box>
            </Paper>
        </>
    )
}



