import { Typography, Paper, Box, Grid, Button, IconButton, TextField, MenuItem, Select } from '@mui/material';
import { useState, useEffect } from 'react';

export default function CustomTraingPage() {
  const [exercises, setExercises] = useState({
    name: '',
    activity: [],
  });

  const bodyParts = ['PERNAS', 'COSTAS', 'BICEPS', 'TRICEPS', 'PEITO', 'ABDOMEM', 'CARDIO'];

 

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
        activity:  updatedActivity
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
              {bodyParts.map((part) => (
                <MenuItem key={part} value={part}>{part}</MenuItem>
              ))}
            </Select>
          </Grid>

        </Grid>
      )
    ))
  );

  async function handleSubmit(e) {
    e.preventDefault();
   
    // Filtrar o array activity removendo objetos vazios
  const updatedActivity = exercises.activity.filter(item => Object.values(item).some(value => value !== ''));

  // Atualizar o estado exercises com o novo array de atividades
  setExercises(prevState => ({
    ...prevState,
    activity: updatedActivity
  }));

  // Agora você pode enviar os dados atualizados para o servidor
  console.log(exercises);
    

  

  }







  
  return (
    <>
      <form>

      <TextField
          fullWidth
          name='name'
          label="Nome da Ficha"
          variant="outlined"
          required
          sx={{ margin: '20px' }}
          value={exercises.name}
          onChange={(e) => setExercises({ ...exercises, name: e.target.value })}
        />

        <Button variant="contained" color="primary" type='submit' onClick={handleSubmit} sx={{ margin: '20px' }}>
          Criar Ficha
        </Button>
        
        <Grid container spacing={3}>
          {['A', 'B', 'C', 'D'].map((groupKey) => (
            <Grid item xs={3} key={groupKey}>
              <Paper elevation={6} sx={{ padding: '8px' }}>
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
                  mt:'4px'
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