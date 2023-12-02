import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import {validatePrice, validateString} from "../../../utils/validations.js";
import Button from "@mui/material/Button";
import {Input, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";

export default function PropertyForm({propId})
{
    const [propertyObj, setPropertyObj] = useState({});
    const errorsLayout = {
        title:'Must be least 3 characters long, and maximum 50',
        pic:'Must be a link to an image, least 3 characters long, and maximum 150',
        price:'Must be numeric and in the range of 1 - 100 000 000',
        location:'Must be a least 3 characters long, and maximum 150',
    }
    const [errors, setErrors] = useState({
        title:false,
    });

    useState( () => {
        if(propId) {
            console.log('new id');
        }
    },[propId]);

    const handleSubmit = () => {
        if(propId) {
            console.log('edit');
            return true;
        }
        console.log('create');
        return true;
    }

    const validateForm = (data, type, additional) => {
        if(type === 'string') {
            if(!validateString(data,{...additional})){
                return true;
            }
            return false;
        }
        if(type === 'price') {
            if(!validatePrice(data)) {
                return true;
            }
            return false;
        }
    }

    useState( () => {
        console.log(errors);
    },[errors])


    return (<>
        <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <TextField
                        autoComplete="title"
                        name="title"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        error={errors.title}
                        helperText={errorsLayout.title}
                        autoFocus
                        value={propertyObj.title}
                        onChange={(e) => {
                            setPropertyObj({...propertyObj, title: e.target.value});
                            setErrors({
                                ...errors,
                                title: validateForm(e.target.value, 'string',{min:3,max:50})
                            });
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        autoComplete="pic"
                        name="pic"
                        required
                        fullWidth
                        id="pic"
                        label="Picture"
                        error={errors.pic}
                        helperText={errorsLayout.pic}
                        autoFocus
                        value={propertyObj.pic}
                        onChange={(e) => {
                            setPropertyObj({...propertyObj, pic: e.target.value});
                            setErrors({
                                ...errors,
                                pic: validateForm(e.target.value, 'string',{min:3,max:150})
                            });
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        autoComplete="price"
                        name="price"
                        required
                        fullWidth
                        id="price"
                        label="Price"
                        error={errors.price}
                        helperText={errorsLayout.price}
                        autoFocus
                        value={propertyObj.price}
                        onChange={(e) => {
                            setPropertyObj({...propertyObj, price: e.target.value});
                            setErrors({
                                ...errors,
                                price: validateForm(e.target.value, 'price')
                            });
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        autoComplete="location"
                        name="location"
                        required
                        fullWidth
                        id="location"
                        label="Location"
                        error={errors.location}
                        helperText={errorsLayout.location}
                        autoFocus
                        value={propertyObj.location}
                        onChange={(e) => {
                            setPropertyObj({...propertyObj, location: e.target.value});
                            setErrors({
                                ...errors,
                                location: validateForm(e.target.value, 'string',{min:3,max:150})
                            });
                        }}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                {propId ? 'Edit' : 'Create'}
            </Button>
        </Box>
    </>);
}