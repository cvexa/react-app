import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, {useState, useEffect} from "react";
import {validateNum, validatePrice, validateString} from "../../../utils/validations.js";
import Button from "@mui/material/Button";
import {Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, ToggleButton} from "@mui/material";
import {propertyFields} from "../../../utils/properties.js";
import CheckIcon from '@mui/icons-material/Check';
import Typography from "@mui/material/Typography";
import {GetPropertyTypes} from "../../../services/properties.jsx";

export default function PropertyForm({propId})
{
    const mapPropertyFields = () => {
        let fillObj = {};
        propertyFields.map( (v,k) => {
            fillObj[v] = '';
        });
        return fillObj;
    };

    const [propertyObj, setPropertyObj] = useState(mapPropertyFields);
    const errorsLayout = {
        title:'Must be least 3 characters long, and maximum 50',
        pic:'Must be a link to an image, least 3 characters long, and maximum 150',
        price:'Must be numeric and in the range of 1 - 100 000 000',
        location:'Must be a link to an image, least 3 characters long, and maximum 150',
        floor_number:'Must be numeric, least 1 and maximum 100',
        number_of_rooms:'Must be numeric, least 1 and maximum 100',
        contract:'Must be least 3 characters long, and maximum 100',
        payment_process:'Must be least 3 characters long, and maximum 100',
        safety:'Must be least 3 characters long, and maximum 100',
        quadrature:'Must be numeric, least 1 and maximum 1000',
    }
    const [errors, setErrors] = useState({
        title:false,
    });
    const [propertyTypes, setPropertyTypes] = useState({});

    useEffect( () => {
        if(propId) {
            console.log('new id');
        }
    },[propId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(propId) {
            console.log('edit');
            return true;
        }
        console.log('create');
        console.log(propertyObj);
        return true;
    }

    const validateForm = (data, type, additional) => {
        if(type === 'string') {
            return !validateString(data,{...additional})
        }

        if(type === 'price') {
            return !validatePrice(data)
        }

        if(type === 'number') {
            return !validateNum(data,additional)
        }
    }

    useEffect( () => {
        try {
            GetPropertyTypes().then((res) => {
                if (!res.message) {
                    setPropertyTypes(res);
                    if(!propId) {
                        setPropertyObj({...propertyObj, type: res[0]});
                    }
                } else {
                    throw new Error(res.message);
                }
            })
        }catch (e) {
            console.log(e);
        }
    },[]);


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
                <Grid item xs={12} sm={3}>
                    <TextField
                        autoComplete="floor number"
                        name="floor_number"
                        required
                        fullWidth
                        id="floor_number"
                        label="Floor Number"
                        error={errors.floor_number}
                        helperText={errorsLayout.floor_number}
                        autoFocus
                        value={propertyObj.floor_number}
                        onChange={(e) => {
                            setPropertyObj({...propertyObj, floor_number: e.target.value});
                            setErrors({
                                ...errors,
                                floor_number: validateForm(e.target.value, 'number',{min:1,max:100})
                            });
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        autoComplete="number of rooms"
                        name="number_of_rooms"
                        required
                        fullWidth
                        id="number_of_rooms"
                        label="Number of rooms"
                        error={errors.number_of_rooms}
                        helperText={errorsLayout.number_of_rooms}
                        autoFocus
                        value={propertyObj.number_of_rooms}
                        onChange={(e) => {
                            setPropertyObj({...propertyObj, number_of_rooms: e.target.value});
                            setErrors({
                                ...errors,
                                number_of_rooms: validateForm(e.target.value, 'number',{min:1,max:100})
                            });
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography> with parking?
                        <ToggleButton
                            sx={{marginLeft:"1%"}}
                            color={'success'}
                            value="check"
                            selected={typeof propertyObj.with_parking == 'string' ? false : propertyObj.with_parking}
                            onChange={() => {
                                setPropertyObj({...propertyObj, with_parking: !propertyObj.with_parking});
                            }}
                        >
                            <CheckIcon />
                        </ToggleButton>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography sx={{textAlign:'center'}}> is Top?
                        <ToggleButton
                            sx={{marginLeft:"1%"}}
                            color={'success'}
                            value="check"
                            selected={typeof propertyObj.is_top == 'string' ? false : propertyObj.is_top}
                            onChange={() => {
                                setPropertyObj({...propertyObj, is_top: !propertyObj.is_top});
                            }}
                        >
                            <CheckIcon />
                        </ToggleButton>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography sx={{textAlign:'center'}}> is Featured?
                        <ToggleButton
                            sx={{marginLeft:"1%"}}
                            color={'success'}
                            value="check"
                            selected={typeof propertyObj.is_featured == 'string' ? false : propertyObj.is_featured}
                            onChange={() => {
                                setPropertyObj({...propertyObj, is_featured: !propertyObj.is_featured});
                            }}
                        >
                            <CheckIcon />
                        </ToggleButton>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography> is Best Deal?
                        <ToggleButton
                            sx={{marginLeft:"1%"}}
                            color={'success'}
                            value="check"
                            selected={typeof propertyObj.is_best_deal == 'string' ? false : propertyObj.is_best_deal}
                            onChange={() => {
                                setPropertyObj({...propertyObj, is_best_deal: !propertyObj.is_best_deal});
                            }}
                        >
                            <CheckIcon />
                        </ToggleButton>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography> is Published?
                        <ToggleButton
                            sx={{marginLeft:"1%"}}
                            color={'success'}
                            value="check"
                            selected={typeof propertyObj.published == 'string' ? false : propertyObj.published}
                            onChange={() => {
                                setPropertyObj({...propertyObj, published: !propertyObj.published});
                            }}
                        >
                            <CheckIcon />
                        </ToggleButton>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                    {propertyTypes.length > 0 &&
                        <Typography component={'span'} sx={{marginRight: '1%'}}> Type
                            <Select
                                labelId="type-label"
                                id="type"
                                value={propertyObj.type}
                                label="Type"
                                onChange={ (e) => {
                                    setPropertyObj({...propertyObj, type: e.target.value});
                                }}
                            >
                                {propertyTypes.map( (type, key) => {
                                    return <MenuItem key={key} value={type}>{type}</MenuItem>
                                })}
                            </Select>
                        </Typography>
                    }
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        autoComplete="contracts"
                        name="contract"
                        required
                        fullWidth
                        id="contract"
                        label="Contract"
                        error={errors.contract}
                        helperText={errorsLayout.contract}
                        autoFocus
                        value={propertyObj.contract}
                        onChange={(e) => {
                            setPropertyObj({...propertyObj, contract: e.target.value});
                            setErrors({
                                ...errors,
                                contract: validateForm(e.target.value, 'string',{min:3,max:100})
                            });
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        autoComplete="payment_process"
                        name="payment_process"
                        required
                        fullWidth
                        id="payment_process"
                        label="Payment process"
                        error={errors.payment_process}
                        helperText={errorsLayout.payment_process}
                        autoFocus
                        value={propertyObj.payment_process}
                        onChange={(e) => {
                            setPropertyObj({...propertyObj, payment_process: e.target.value});
                            setErrors({
                                ...errors,
                                payment_process: validateForm(e.target.value, 'string',{min:3,max:100})
                            });
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        autoComplete="safety"
                        name="safety"
                        required
                        fullWidth
                        id="safety"
                        label="Safety"
                        error={errors.safety}
                        helperText={errorsLayout.safety}
                        autoFocus
                        value={propertyObj.safety}
                        onChange={(e) => {
                            setPropertyObj({...propertyObj, safety: e.target.value});
                            setErrors({
                                ...errors,
                                safety: validateForm(e.target.value, 'string',{min:3,max:100})
                            });
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        autoComplete="quadrature"
                        name="quadrature"
                        required
                        fullWidth
                        id="quadrature"
                        label="Quadrature"
                        error={errors.quadrature}
                        helperText={errorsLayout.quadrature}
                        autoFocus
                        value={propertyObj.quadrature}
                        onChange={(e) => {
                            setPropertyObj({...propertyObj, quadrature: e.target.value});
                            setErrors({
                                ...errors,
                                quadrature: validateForm(e.target.value, 'number',{min:1,max:10000})
                            });
                        }}
                    />
                </Grid>
            </Grid>
            <div style={{textAlign:'center'}}>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    {propId ? 'Edit' : 'Create'}
                </Button>
            </div>
        </Box>
    </>);
}