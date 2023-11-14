import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {Checkbox, FormControlLabel, ThemeProvider} from "@mui/material";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import {Copyright} from "@mui/icons-material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useState} from "react";

export default function Register() {
    const usrObjLayout = {
        firstName:'',
        lastName:'',
        password:'',
        cPassword:''
    };
    const [userObj, setUserObj] = useState(usrObjLayout);

    const [errors, setErrors] = useState(usrObjLayout);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);
    }
    console.log(errors);
    const validateName = () => {
        if(userObj.firstName.length < 3){
            setErrors({...errors, firstName:true})
        }
        if(userObj.lastName.length < 3){
            setErrors({...errors, lastName:true})
        }
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
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
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
                                    helperText={errors.firstName}
                                    autoFocus
                                    value={userObj.firstName}
                                    onChange={(e) => {
                                      setUserObj({...userObj, firstName: e.target.value});
                                      validateName();
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
                                    autoComplete="family-name"
                                    value={userObj.lastName}
                                    onChange={(e) => {
                                        setUserObj({...userObj, lastName: e.target.value});
                                        validateName();
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
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
    );
}