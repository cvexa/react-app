import {
    Alert,
    Card,
    CardActions, CardContent,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import {deleteUserById, getUserById, logOut, updateUserById} from "../../services/user.jsx";
import {useUserContext} from "../../contexts/User.jsx";
import TextField from "@mui/material/TextField";
import {isEmailValid} from "../../utils/validations.js";
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import CustomDialog from "../Admin/Dialog/CustomDialog.jsx";
import {useDialogContext} from "../../contexts/Dialog.jsx";

export default function Profile() {
    const usrObjLayout = {
        firstName:'',
        lastName:'',
        email:'',
    };

    const errorsLayout = {
        firstName:'Should be least 3 characters',
        lastName:'Should be least 3 characters',
        email:'Should be a valid email',
    }
    const {user, setUser} = useUserContext();
    const [userById, setUserById] = useState();
    const [editMode, setEditMode] = useState(false);
    const [userObj, setUserObj] = useState(usrObjLayout);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [registerError, setRegisterError] = useState(false);
    const navigate = useNavigate();
    const { openDialog, setOpenDialog } = useDialogContext();
    const { agree, setAgree } = useDialogContext();


    const fetchUser = () => {
        try {
            getUserById(user.id).then((res) => {
                setUserById(res);
                let name = res.name.split(/(?<=^\S+)\s/);
                setUserObj({firstName:name[0], lastName:name[1],email: res.email});
                setLoading(false);
            });
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const handleEditClick = () => {
        setEditMode(true);
    }

    const handleUpdateClick = () => {
        let name = userObj.firstName + ' ' + userObj.lastName;
        updateUserById(userById.id, {email:userObj.email, name: name}).then((res) => {
            setUserById(res.data);
            let name = res.data.name.split(/(?<=^\S+)\s/);
            setUserObj({firstName:name[0], lastName:name[1],email: res.data.email});
            setLoading(false);
            setEditMode(false);
        });
    }

    const handleBackClick = () => {
        setEditMode(false);
    }

    const handleDeleteBtn = () => {
        setOpenDialog(true);
    }

    const handleDeleteUser = () => {
        try {
            deleteUserById(userById.id).then( () => {
                localStorage.clear();
                setUser({});
                navigate('/');
            });
        }catch (e) {
            console.log(e);
        }
    }

    useEffect( () => {
        if(agree) {
            setAgree(false);
            handleDeleteUser();
        }
    }, [agree])

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

    return (
        <>
            <Card sx={{minWidth: 275, maxWidth: 400}}>
                    {userById && !editMode ? (
                            <>
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Email : {userById.email}
                                    </Typography>
                                    <Typography sx={{fontSize: 14}}  color="text.secondary" gutterBottom>
                                        Name : {userById.name}
                                    </Typography>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Created at : {new Date(userById.created_at).toLocaleDateString()}
                                    </Typography>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Updated at : {new Date(userById.updated_at).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </>
                    ) :
                        ''
                       }
                {userById && editMode ?
                    <>
                        <CardContent>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                <TextField
                                    required
                                    autoFocus
                                    fullWidth
                                    id="email"
                                    sx={{marginBottom:'2%'}}
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
                            </Typography>
                            <Typography sx={{fontSize: 14}}  color="text.secondary" gutterBottom>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    sx={{marginBottom:'2%'}}
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    error={typeof errors.firstName === 'string' ? false : errors.firstName}
                                    helperText={errorsLayout.firstName}
                                    value={userObj.firstName}
                                    onChange={(e) => {
                                        setUserObj({...userObj, firstName: e.target.value});
                                        validateName({firstName: e.target.value , lastName: userObj.lastName});
                                    }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    sx={{marginBottom:'2%'}}
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
                            </Typography>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                Created at : {new Date(userById.created_at).toLocaleDateString()}
                            </Typography>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                Updated at : {new Date(userById.updated_at).toLocaleDateString()}
                            </Typography>
                        </CardContent>
                    </>
                    : ''
                }
                    {registerError && <Alert severity="error">{registerError}</Alert>}
                    <CardActions>
                        {!editMode ? <Button size="small" onClick={handleEditClick}>edit</Button> :
                            <>
                                <Button size="small" onClick={handleBackClick}>back</Button>
                                <Button variant="contained" size="small" onClick={handleUpdateClick}>change</Button>
                            </>
                        }
                    </CardActions>
            </Card>
            <Box component="section" sx={{ p: 2, border: '1px dashed grey', minWidth: 275, maxWidth: 400, marginTop: '2%', textAlign: 'center' }}>
                <Button variant="outlined" size="small"  color="error" startIcon={<DeleteIcon />} onClick={handleDeleteBtn}>
                    Delete
                </Button>
            </Box>
            <CustomDialog title={'Are you sure?'} text={'Are you sure that you want to delete your profile? If you agree your account will be permanently deleted!'}/>
        </>
    );
}