import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, {useState, useEffect} from "react";
import {validateNum, validatePrice, validateString} from "../../../utils/validations.js";
import Button from "@mui/material/Button";
import {
    Alert,
    MenuItem,
    Select,
    ToggleButton
} from "@mui/material";
import {
    parseIntValuesFromPropertyFieldsFromBe,
    parseNullPropertyFieldsFromBe,
    propertyFields
} from "../../../utils/properties.js";
import CheckIcon from '@mui/icons-material/Check';
import Typography from "@mui/material/Typography";
import {createProperty, GetPropertyById, GetPropertyTypes, updateProperty} from "../../../services/properties.jsx";
import {useDialogContext} from "../../../contexts/Dialog.jsx";
import {useAlertContext} from "../../../contexts/Alert.jsx";

export default function PropertyForm({propId, properties, syncProperties})
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
        price:'Must be numeric and in the range of 10 - 100 000 000',
        location:'Must be a link to an image, least 3 characters long, and maximum 150',
        floor_number:'Must be numeric, least 1 and maximum 100',
        number_of_rooms:'Must be numeric, least 1 and maximum 100',
        contract:'Must be least 3 characters long, and maximum 100',
        payment_process:'Must be least 3 characters long, and maximum 100',
        safety:'Must be least 3 characters long, and maximum 100',
        quadrature:'Must be numeric, least 1 and maximum 1000',
    }
    const [errors, setErrors] = useState({});
    const [propertyTypes, setPropertyTypes] = useState({});
    const [isFormReady, setIsFormReady] = useState(false);
    const [submitError, setSubmitError] = useState();
    const { openDialog, setOpenDialog } = useDialogContext();
    const [message, setMessage] = useState(false);
    const {trigger, setTrigger} = useAlertContext();
    const {msg, setMsg} = useAlertContext();

    useEffect( () => {
        if(propId) {
            try {
                GetPropertyById(propId).then((res) => {
                    res.type = res.type.charAt(0).toUpperCase() + res.type.slice(1);
                    let editProperty = parseNullPropertyFieldsFromBe(res);
                    editProperty = parseIntValuesFromPropertyFieldsFromBe(editProperty);
                    setPropertyObj({...propertyObj,...editProperty});
                });
            }catch (e) {
                console.log(e);
            }
        }
    },[propId]);

    useEffect( () => {
        if(!propId) {
            if (Object.keys(errors).length !== Object.keys(errorsLayout).length) {
                setIsFormReady(false);
            } else {
                if (Object.values(errors).filter(item => item === true).length) {
                    setIsFormReady(false);
                } else {
                    setIsFormReady(true);
                }
            }
        }else{//update
            if (Object.values(errors).filter(item => item === true).length) {
                setIsFormReady(false);
            } else {
                setIsFormReady(true);
            }
        }
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(propId) {
            if(isFormReady) {
                updateProperty(propId, propertyObj).then( (res) => {
                    if(res.success) {
                        setPropertyObj(res.property);
                        setOpenDialog(false);
                        setTrigger(true);
                        setMsg('Successfully edited property!');
                    }else{
                        setSubmitError('something went wrong'+res);
                    }
                });
            }
            return true;
        }

        if(isFormReady) {
            try {
                createProperty(propertyObj).then((res) => {
                    if(res.success) {
                        setPropertyObj(mapPropertyFields);
                        setOpenDialog(false);
                        setTrigger(true);
                        setMsg('Successfully created property!');
                    }else{
                        setSubmitError('something went wrong'+res);
                    }
                })
            } catch (e) {
                console.log(e);
            }
        }
        return true;
    }

    const validateForm = (data, type, additional) => {
        if(type === 'string') {
            return !validateString(data,{...additional})
        }

        if(type === 'price') {
            return !validatePrice(data) || data < 10;
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
            {propertyObj &&
                <>
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
                                    selected={typeof propertyObj.with_parking == 'string' || typeof propertyObj.with_parking === 0 ? false : propertyObj.with_parking}
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
                                    selected={typeof propertyObj.is_top == 'string' || typeof propertyObj.is_top === 0 ? false : propertyObj.is_top}
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
                                    selected={typeof propertyObj.is_featured == 'string' || typeof propertyObj.is_featured === 0 ? false : propertyObj.is_featured}
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
                                    selected={typeof propertyObj.is_best_deal == 'string' || typeof propertyObj.is_best_deal === 0 ? false : propertyObj.is_best_deal}
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
                                    selected={typeof propertyObj.published == 'string' || typeof propertyObj.published === 0 ? false : propertyObj.published}
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
                        {submitError && <Alert severity="error">{submitError}</Alert>}
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            {propId ? 'Edit' : 'Create'}
                        </Button>
                    </div>
                </>
            }
        </Box>
    </>);
}