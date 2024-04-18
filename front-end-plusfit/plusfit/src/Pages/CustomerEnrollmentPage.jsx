import React from 'react'
import { Typography, Paper, TextField, Grid } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/en-gb'




export default function CustomerEnrollmentPage() {



  return (

    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <Paper elevation={6}
          sx={{
            padding: '24px',
            maxWidth: '60vw',
            margin: 'auto',
          }}>

          <form>
            <Grid container columnSpacing={3} rowSpacing={2}>

              <Grid item xs={6} md={8}>
                <TextField
                  name="fullName"
                  label="Nome Completo"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: 10,
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  name="idt_number"
                  label="CPF"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: 10,
                  }}
                />
              </Grid>

              <Grid item xs={6} md={8}>
                <TextField
                  name="adress"
                  label="Endereço"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: 10,
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  name="adress_number"
                  label="numero"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: 10,
                    width: 120

                  }}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  name="city"
                  label="Cidade"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: 10,
                  }}
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <TextField
                  name="state"
                  label="Estado"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: 10,
                  }}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  name="zip_code"
                  label="CEP"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: 10,
                    width: 304
                  }}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <DatePicker
                name="birthdate"
                label="Data de Nascimento"
                inputVariant="outlined"
                fullWidth
                sx={{
                  borderRadius: 10,
                  width: 343
                }}
                />
              </Grid>


            </Grid>
          </form>

        </Paper>
      </LocalizationProvider>
    </>

  )
}