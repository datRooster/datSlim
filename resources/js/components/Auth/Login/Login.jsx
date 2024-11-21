import React, { useState } from "react";
import axios from "axios";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Alert,
} from "@mui/material";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("api/auth/login", {
                email,
                password,
            })
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                location.replace("dashboard")
            })
            .catch((error) => {
                setError("Credenziali non valide. Riprova");
            });
    };
    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Accedi
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        fullWidth
                        required
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Accedi
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default Login;
