import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from './../../Axios/axios'
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon, DatSlimIcon} from './CustomIcons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignInCard({ allowRegistration }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Blocca il comportamento predefinito
  
    // Esegui la validazione
    if (!validateInputs()) {
      console.log('Validation failed');
      return; // Blocca l'esecuzione se la validazione fallisce
    }
  
    const data = new FormData(event.currentTarget);
    const rememberMe = data.get('remember_me') === 'remember_me'; // Controlla se il valore esiste
    axios
      .post("api/auth/login", {
        email: data.get('email'),
        password: data.get('password'),
        remember_me: rememberMe,
      })
      .then((response) => {
        console.log("Response:", response.data);
        localStorage.setItem("token", response.data.token);
        // Recupera i dati del cookie dalla risposta
        const cookieData = response.data.cookie_data;
        if(cookieData){
          // Costruisce il cookie manualmente
          let cookieString = `${cookieData.name}=${cookieData.value}; Path=${cookieData.path};`;
          if (cookieData.domain) {
            cookieString += ` Domain=${cookieData.domain};`;
          }
          if (cookieData.secure) {
            cookieString += ' Secure;';
          }
          if (cookieData.samesite) {
            cookieString += ` SameSite=${cookieData.samesite};`;
          }
          // Imposta il cookie nel browser
          document.cookie = cookieString;
        }
        location.replace("dashboard");
      })
      .catch((error) => {
        if (error.response) {
          // L'errore proviene dal backend
          setError(error.response.data.message || "Credenziali non valide. Riprova.");
        } else if (error.request) {
          // Nessuna risposta dal backend
          setError("Impossibile connettersi al server.");
        }else{
          console.error("Unknown error:", error.message);
          setError("Errore sconosciuto, riprova");
        }
      }
    );
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <DatSlimIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        {error && (
          <Typography
            sx={{ color: 'error.main', textAlign: 'left', mb: 0 }}
            role="alert"
          >
            {error}
          </Typography>
        )}
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'baseline' }}
            >
              Password dimenticata?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember_me" color="primary" />}
          label="Remember me"
          name="remember_me"
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
          Sign In
        </Button>
      </Box>
      { allowRegistration && (
        <>
          <Typography sx={{ textAlign: 'center' }}>
            Non hai un account?{' '}
            <span>
              <Link
                href="#"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Registrati
              </Link>
            </span>
          </Typography>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
          </Box>
        </>
      )}
    </Card>
  );
}