import React from 'react';
import { Typography, Box, Button, Grid, Card, CardContent, CardMedia, Container } from '@mui/material';
import EquipamentoModerno from "../assets/plusfitEquipamento.jpg"
import TreinoPersonalizado from "../assets/plusfitTreino.jpg"
import logo from "../assets/logoGigantesShadow1.png";
import Treinador from "../assets/Treinador.jpg"



export default function HomePage() {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <img
          src={logo}
          alt="Gigantes Gym Logo"
          style={{ width: '100%', maxWidth: '300px' }}
        />
      </Box>
      <Typography variant="h5" sx={{ textAlign: 'center', marginTop: 2, fontWeight: 'bold', color: '#550b6a' }}>
        VENHA SER GIGANTE COM A GENTE!
      </Typography>

      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Button variant="contained" color="primary" href="/cadastrar_cliente">
          Inscreva-se agora
        </Button>
      </Box>

      <Grid container spacing={4} sx={{ marginTop: 3 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={6}>
            <CardMedia
              component="img"
              height="140"
              image={TreinoPersonalizado}
              alt="Treinamento personalizado"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Treinamento Personalizado
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tenha um plano de treino customizado para alcançar seus objetivos.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={6}>
            <CardMedia
              component="img"
              height="140"
              image={EquipamentoModerno}
              alt="Equipamentos Modernos"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Equipamentos Modernos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Treine com os melhores e mais modernos equipamentos do mercado.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={6}>
            <CardMedia
              component="img"
              height="140"
              image={Treinador}
              alt="Treinador"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Melhor Assistencia
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Conte com a assistência dos nossos melhores treinadores para alcançar seus objetivos fitness!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 4, padding: 2, backgroundColor: '#f0f0f0' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>
          Benefícios de ser membro Gigante
        </Typography>
        <Typography variant="body1">
          Como um membro da Gigantes Gym, você terá acesso a uma ampla gama de serviços e benefícios:
        </Typography>
        <ul>
          <li>Equipamentos modernos</li>
          <li>Acompanhamento nutricional</li>
          <li>Plano de treino personalizado</li>
        </ul>
      </Box>
    </Container>
  );
}
