import React, { useState } from 'react';
import Sidebar from './Sidebar';
import axios from './Axios/axios';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import { toggleDarkMode } from '../store/themeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Container, Card, CardContent, CardMedia, CardActions, Grid2, Box, Button, IconButton, Switch } from '@mui/material';

function Dashboard() {
  const [selectedSection, setSelectedSection] = useState('Section 1');
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);
  const [error, setError] = useState('');
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
    },
  });
  const handleSectionSelect = (section) => {
    setSelectedSection(section);
  };
  const handleLogout = () => {
      axios
      .post("/auth/logout", {

      })
      .then(() => {
          localStorage.removeItem("token");
          location.replace("/");
      })
      .catch((error) => {
          setError(error);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
      <Sidebar
          drawerCollapsed={drawerCollapsed}
          setDrawerCollapsed={setDrawerCollapsed}
          handleSectionSelect={handleSectionSelect}
          handleLogout={handleLogout}
        />

        <Box sx={{ flexGrow: 1, backgroundColor: 'background.default', minHeight: '100vh' }}>
          <AppBar position="fixed" sx={{ backgroundColor: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerCollapsed(!drawerCollapsed)} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                MUI Drawer Example
              </Typography>
              <Switch checked={darkMode} onChange={() => dispatch(toggleDarkMode())} color="default" />
            </Toolbar>
          </AppBar>

          <Container maxWidth={false} disableGutters sx={{ marginTop: 12, paddingLeft: 2, paddingRight: 2 }}>
            {selectedSection === 'Section 1' && (
              <Grid2 container spacing={4}>
                <Grid2 xs={12} md={6}>
                  <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image="https://www.tecnoside.it/assets/img/portfolio/project1/1.jpg"
                      alt="Random image 1"
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Titolo della Card 1
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Questa è la descrizione della prima card. Utilizza i componenti MUI per una UI ricca e moderna.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" variant="contained">
                        Scopri di più
                      </Button>
                    </CardActions>
                  </Card>
                </Grid2>

                <Grid2 xs={12} md={6}>
                  <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image="https://www.tecnoside.it/assets/img/portfolio/project1/2.jpg"
                      alt="Random image 2"
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Titolo della Card 2
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Questa è la descrizione della seconda card. Progetta le tue interfacce con componenti flessibili.
                      </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" variant="contained">
                            Scopri di più
                      </Button>
                    </CardActions>
                  </Card>
                </Grid2>
              </Grid2>
            )}
            {selectedSection === 'Section 2' && (
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h4" component="div">
                  Sezione 2
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Questa è la seconda sezione, che può contenere contenuti diversi.
                </Typography>
              </Box>
            )}
            {selectedSection === 'Section 3' && (
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h4" component="div">
                  Sezione 3
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Questa è la terza sezione, che può contenere contenuti diversi.
                </Typography>
              </Box>
            )}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;