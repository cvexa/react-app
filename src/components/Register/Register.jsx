import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {Alert, Checkbox, CircularProgress, FormControlLabel, ThemeProvider} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Copyright} from "@mui/icons-material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, {useState} from "react";
import {isEmailValid, isPasswordValid} from "../../utils/validations.js";
import {register} from "../../services/user.jsx";
import {useUserContext} from "../../contexts/User.jsx";

export default function Register() {
    const usrObjLayout = {
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        cPassword:''
    };

    const errorsLayout = {
        firstName:'Should be least 3 characters',
        lastName:'Should be least 3 characters',
        email:'Should be a valid email',
        password:'Password should be least 6 characters and include atleast one number',
        cPassword:'Password should be least 6 characters and include atleast one number',
    }
    const { user, setUser } = useUserContext();
    const [userObj, setUserObj] = useState(usrObjLayout);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [registerError, setRegisterError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            let name = userObj.firstName + ' ' + userObj.lastName;
            register({...userObj, name: name, c_password: userObj.cPassword}).then( (res) => {
                setLoading(false);
                if(res.success) {
                    setUser(res.data);
                    navigate('/dashboard');
                }else{
                    setRegisterError(res.data[0]);
                    console.log(res);
                }
            });
        }catch(e) {
            setRegisterError(e.data);
        }
    }

    const validateName = (nameObj) => {
        let fNameError = false;
        let lNameError = false;
        if(nameObj.firstName.length < 3){
            fNameError = true;
        }
        if(nameObj.lastName.length < 3){
            setErrors({...errors, lastName:true})
            lNameError = true;
        }

        setErrors({...errors, firstName:fNameError, lastName:lNameError});
    }

    const validateEmail = (email) => {
        let isVaildEmailError = false;
        if(!isEmailValid(email)){
            isVaildEmailError = true
        }
        setErrors({...errors, email:isVaildEmailError})
    }

    const validatePassword = (passwObj) => {
        let passwordError = false;
        let cPasswordError = false;
        if(!isPasswordValid(passwObj.password)){
            passwordError = true;
        }

        if (!isPasswordValid(passwObj.cPassword)) {
            cPasswordError = true;
        }

        if(passwObj.password !== passwObj.cPassword) {
            passwordError = true;
            cPasswordError = true;
        }

        setErrors({...errors, password:passwordError, cPassword:cPasswordError});
    }

    return (
        <Container component="main" maxWidth="sm">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    error={typeof errors.firstName === 'string' ? false : errors.firstName}
                                    helperText={errorsLayout.firstName}
                                    autoFocus
                                    value={userObj.firstName}
                                    onChange={(e) => {
                                      setUserObj({...userObj, firstName: e.target.value});
                                      validateName({firstName: e.target.value , lastName: userObj.lastName});
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    error={typeof errors.lastName === 'string' ? false : errors.lastName}
                                    helperText={errorsLayout.lastName}
                                    autoComplete="family-name"
                                    value={userObj.lastName}
                                    onChange={(e) => {
                                        setUserObj({...userObj, lastName: e.target.value});
                                        validateName({firstName: userObj.firstName, lastName: e.target.value})
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    helperText={errorsLayout.email}
                                    autoComplete="email"
                                    error={errors.email}
                                    value={userObj.email}
                                    onChange={(e) => {
                                        setUserObj({...userObj, email: e.target.value});
                                        validateEmail(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    helperText={errorsLayout.password}
                                    id="password"
                                    autoComplete="new-password"
                                    error={errors.password}
                                    value={userObj.password}
                                    onChange={(e) => {
                                        setUserObj({...userObj, password: e.target.value});
                                        validatePassword({cPassword: userObj.cPassword, password: e.target.value})
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="cPassword"
                                    label="RepeatPassword"
                                    type="password"
                                    helperText={errorsLayout.cPassword}
                                    id="cPassword"
                                    autoComplete="new-password"
                                    error={errors.cPassword}
                                    value={userObj.cPassword}
                                    onChange={(e) => {
                                        setUserObj({...userObj, cPassword: e.target.value});
                                        validatePassword({password: userObj.password, cPassword: e.target.value})
                                    }}
                                />
                            </Grid>
                        </Grid>
                        {!loading ?
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign Up
                            </Button>
                            :
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                        }
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                        {registerError && <Alert severity="error">{registerError}</Alert>}
                    </Box>
                </Box>
            </Container>
    );
}