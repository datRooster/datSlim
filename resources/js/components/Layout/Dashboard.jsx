/*
  import React, { useState } from 'react';
  import Sidebar from './Partials/Sidebar';
  import axios from '../Axios/axios';
  import MenuIcon from '@mui/icons-material/Menu';
  import CssBaseline from '@mui/material/CssBaseline';
  import { toggleDarkMode } from '../../store/themeSlice';
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
*/

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from './Partials/Navigator';
import Content from './Partials/Content';
import Header from './Partials/Header';

function Copyright() {
  return (
    <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        DatSlim - React
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 256;

export default function Paperbase() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
            <Content />
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}