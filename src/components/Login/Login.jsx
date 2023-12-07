import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {logIn} from '../../services/user.jsx'
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../contexts/User.jsx";
import {Alert, CircularProgress} from "@mui/material";
import {isEmailValid, isPasswordValid} from "../../utils/validations.js"

export default function Login() {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const userValidationMsg = 'Email address is required and should be valid email';
    const passwordValidationMsg = 'Password should be least 6 characters and include atleast one number';
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useUserContext();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(!errors.email && !errors.password) {
            setLoading(true);
            try{
                logIn({email: data.get('email'), password: data.get('password')}).then( (res) => {
                    setLoading(false);
                    if(res.success) {
                        setUser(res.data);
                        navigate('/dashboard');
                    }else{
                        setLoginError(res.message);
                    }
                });
            }catch(e) {
                setLoginError(e);
            }
        }
    };

    const isUsrValid = (user) => {
        let isVaildEmailError = false;
        if(!isEmailValid(user)){
            isVaildEmailError = true
        }
        setErrors({...errors, email:isVaildEmailError})
    }

    const isPassValid = (pass) => {
        let isValidPasswordError = false;
        if(!isPasswordValid(pass)){
            isValidPasswordError = true
        }
        setErrors({...errors, password:isValidPasswordError})
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        error={errors.email}
                        helperText={userValidationMsg}
                        value={userEmail}
                        onChange={ (e) => {
                            setUserEmail(e.target.value);
                            isUsrValid(e.target.value)
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        error={errors.password}
                        helperText={passwordValidationMsg}
                        value={password}
                        onChange={ (e) => {
                            setPassword(e.target.value);
                            isPassValid(e.target.value)
                        }}
                    />
                    {!loading ?
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        :
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    }
                    <Grid container>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    {loginError && <Alert severity="error">{loginError}</Alert>}
                </Box>
            </Box>
        </Container>
    );
}