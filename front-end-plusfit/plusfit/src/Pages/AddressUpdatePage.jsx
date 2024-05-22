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
            await axios.put(`http://localhost:8080/customer/address/${params.id}`, data, headers)
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
        
        
        </>
    )
}