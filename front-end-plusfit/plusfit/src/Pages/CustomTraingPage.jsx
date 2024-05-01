import React from 'react';
import { Typography, Paper, Box, Grid, Button, IconButton, TextField, MenuItem, Select, Alert } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Waiting from '../ui/Waiting';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CustomTraingPage() {
  const [exercises, setExercises] = useState({
    name: '',
    activity: [],
  });

  const bodyPart = ['PEITO', 'COSTAS', 'OMBROS', 'TRICEPS', 'BICEPS', 'PERNAS', 'GLUTEOS', 'ABDOMEN'];

  const [nameError, setNameError] = useState(false);
  const [formValid, setFormValid] = useState('')

  const [state, setState] = useState({
    showWaiting: false
  })
  const { showWaiting } = state



  const handleAddExercise = (groupKey) => {
    if (exercises.activity.length < 41 || exercises.activity === null) {
      setExercises({
        ...exercises,
        activity: [...exercises.activity, { description: '', bodyPart: '', group: groupKey }]
      });
    }
  };

  const handleRemoveExercise = (groupKey) => {
    if (exercises.activity.length > 1) {
      const updatedActivity = [...exercises.activity]
      updatedActivity.pop()
      setExercises({
        ...exercises,
        activity: updatedActivity
      });
    }
  };

  const handleChange = (groupKey, index, field, value) => {
    const updatedExercises = [...exercises.activity];
    updatedExercises[index][field] = value;
    setExercises({
      ...exercises,
      activity: updatedExercises
    });
  };

  const renderExercises = (groupKey) => (
    exercises.activity.map((exercise, index) => (
      exercise.group === groupKey && (
        <Grid container spacing={2} key={index}>
          <Grid item xs={6} >
            <TextField
              fullWidth
              label="Descrição"
              variant="outlined"
              sx={{ marginBottom: '8px', ml: '8px' }}
              value={exercise.description}
              onChange={(e) => handleChange(groupKey, index, 'description', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              fullWidth
              value={exercise.bodyPart}
              onChange={(e) => handleChange(groupKey, index, 'bodyPart', e.target.value)}
              displayEmpty
            >
              <MenuItem value="">
                <em>Parte do Corpo</em>
              </MenuItem>
              {bodyPart.map((part) => (
                <MenuItem key={part} value={part}>{part}</MenuItem>
              ))}
            </Select>
          </Grid>

        </Grid>
      )
    ))
  );

  function handleVoltar() {
    window.location.href = "/clientes"
  }

  const handleErrorName = () => {
    if (!exercises.name) {
      setNameError(true)
      return
    }
    setNameError(false)
    setFormValid("")

  }



  async function handleSubmit(e) {
    e.preventDefault();

    if (nameError || !exercises.name) {
      setFormValid("Nome da ficha não preenchido")
      return
    }

    // Filtrar o array activity removendo objetos vazios
    const updatedActivity = exercises.activity.filter(item => Object.values(item).some(value => value !== ''));

    // Atualizar o estado exercises com o novo array de atividades
    setExercises(prevState => ({
      ...prevState,
      activity: updatedActivity
    }));

    // Mapear os dados no formato adequado para a API
    const formattedActivity = updatedActivity.map(({ description, bodyPart, group }) => ({
      description,
      bodyPart,
      group
    }));


    // Criar o objeto de dados para enviar na solicitação POST
    const data = {

      name: exercises.name,
      activity: formattedActivity

    }


  
  // enviar os dados atualizados para o servidor
  console.log(data);

  //pegando o id do cliente para o post
  const id = localStorage.getItem('customerId')


  const headers = {
    'Content-Type': 'application/json',
  }
  setState({ ...state, showWaiting: true })
  try{
    await axios.post(`http://localhost:8080/trainingSheet/customer/${id}`, data, headers)

    // Limpar o estado e mostrar feedback de sucesso
    setExercises({ name: '', activity: [] });
    setFormValid("Ficha criada com sucesso!");
    setState({ ...state, showWaiting: false })

  }catch(error){
    console.error('Erro ao criar a ficha:', error);
    setState({ ...state, showWaiting: false })

  }
    

}

useEffect(() => {
  if (formValid) {
    const formValidTimeout = setTimeout(() => {
      setFormValid(false);
    }, 3000);

    return () => clearTimeout(formValidTimeout);
  }
}, [formValid]);







return (
  <>
    <Waiting show={showWaiting} />
    <form>

      <Box sx={{ display: 'flex', alignItems: 'center', ml: '12px' }}>
        <Typography variant='h6' sx={{ mr: '12px' }}>
          Nome do cliente:
        </Typography>
        <Typography sx={{ mt: '4px' }}>
          {localStorage.getItem('name')}
        </Typography>
      </Box>

      <TextField
        name='name'
        label="Nome da Ficha"
        variant="outlined"
        required
        sx={{ margin: '5px 12px 12px', width: 420 }}
        value={exercises.name}
        onChange={(e) => setExercises({ ...exercises, name: e.target.value })}
        onBlur={handleErrorName}
      />

      <Button variant="contained" color="primary" type='submit' startIcon={<CreateNewFolderIcon />}
        onClick={handleSubmit}
        sx={{ margin: '15px 12px 12px 18px', mb: '4px' }}>
        Criar Ficha
      </Button>
      <Button variant="contained" color="secondary" type='submit' onClick={handleVoltar} sx={{ margin: '15px 12px 12px 18px', mb: '4px' }}>
        Voltar
      </Button>

      {formValid && (<Alert severity="error" sx={{ margin: '5px 12px 12px', width: 450 }}>
        {formValid}
      </Alert>)}

      <Grid container spacing={3}>
        {['A', 'B', 'C', 'D'].map((groupKey) => (
          <Grid item xs={3} key={groupKey}>
            <Paper elevation={6} sx={{ padding: '8px', mt: '8px' }}>
              <Typography variant="h5" sx={{
                textAlign: 'center',
                justifyContent: 'auto',
                marginBottom: '8px'
              }} >
                Grupo {groupKey}
              </Typography>
              {renderExercises(groupKey)}

              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: '4px'
              }}>
                <Button onClick={() => handleAddExercise(groupKey)} variant="contained" color="primary" sx={{ ml: '8px', mr: '4px', mb: '8px' }}>
                  Adicionar Exercício
                </Button>
                <Button onClick={() => handleRemoveExercise(groupKey)} variant="contained" color="secondary" sx={{ ml: '8px', mr: '4px', mb: '8px' }}>
                  Remover Exercício
                </Button>

              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </form>


  </>
);
}
