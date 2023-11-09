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
import {Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const userValidationMsg = 'Email address is required and should be valid email';
    const passwordValidationMsg = 'Password should be least 6 characters and include atleast one number';
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(!errors.email && !errors.password) {
            console.log({
                email: data.get('email'),
                password: data.get('password'),
            });
            try{
                logIn({email: data.get('email'), password: data.get('password')}).then( (res) => {
                    console.log(res);
                    navigate('/dashboard');
                    //to do store user token into user context to be used on the app later
                });
            }catch(e) {
                setLoginError(e);
            }
        }else{
            console.log('error');
        }
    };

    const isUsrValid = () => {
        if(user.length < 1 || !/\S+@\S+\.\S+/.test(user)){
           setErrors({...errors, email:true})
        }else {
            setErrors({...errors, email: false});
        }
    }

    const isPassValid = () => {
        if(password.length < 6 || !/^(?=.{6,}$)\D*\d/.test(password)){
            setErrors({...errors, password:true})
        }else {
            setErrors({...errors, password:false})
        }
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
                        value={user}
                        onChange={ (e) => {
                            setUser(e.target.value);
                            isUsrValid();
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
                            isPassValid();
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
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