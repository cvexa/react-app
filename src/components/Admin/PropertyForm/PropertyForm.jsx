import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {validateNum, validatePrice, validateString} from "../../../utils/validations.js";
import Button from "@mui/material/Button";
import {Alert, MenuItem, ToggleButton} from "@mui/material";
import {
    parseIntValuesFromPropertyFieldsFromBe,
    parseNullPropertyFieldsFromBe,
    propertyFields
} from "../../../utils/properties.js";
import CheckIcon from '@mui/icons-material/Check';
import Typography from "@mui/material/Typography";
import {
    checkAvailableFeatured,
    createProperty,
    GetPropertyById,
    GetPropertyTypes,
    updateProperty
} from "../../../services/properties.jsx";
import {useDialogContext} from "../../../contexts/Dialog.jsx";
import {useAlertContext} from "../../../contexts/Alert.jsx";
import {useUserContext} from "../../../contexts/User.jsx";

export default function PropertyForm({propId, properties, syncProperties, pagination, syncPagination})
{
    const mapPropertyFields = () => {
        let fillObj = {};
        propertyFields.map( (v,k) => {
            fillObj[v] = '';
        });
        fillObj.type = 'Apartment';
        return parseIntValuesFromPropertyFieldsFromBe(fillObj);
    };

    const { user, setUser } = useUserContext();
    const {trigger, setTrigger} = useAlertContext();
    const {msg, setMsg} = useAlertContext();
    const { openDialog, setOpenDialog } = useDialogContext();

    const [propertyObj, setPropertyObj] = useState(mapPropertyFields);
    const errorsLayout = {
        title:'Must be least 3 characters long, and maximum 50',
        description: 'Must be least 3 characters lond, and maxmimum 150',
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
    const [isFeaturedNotAllowed, setIsFeaturedNotAllowed] = useState(false);
    const [featuredNotAllowedMsg, setFeaturedNotAllowedMsg] = useState();

    useEffect( () => {
        setPropertyObj(mapPropertyFields);
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
                        setPropertyObj({...res.property});
                        setFeaturedNotAllowedMsg(undefined);
                        setOpenDialog(false);
                        setTrigger(true);
                        setMsg('Successfully edited property!');
                        properties.map( (data, position) => {//refresh properties list with the updated one
                            Object.keys(properties[position]).map( (key) => {
                                if(properties[position].id === res.property.id) {
                                    properties[position] = {...res.property};
                                }
                            })
                        })
                        syncProperties(properties);
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
                        setFeaturedNotAllowedMsg(undefined);
                        if(pagination.page === pagination.count) {
                            syncProperties([...properties, res.property]);
                        }
                        syncPagination({...pagination, total: pagination.total + 1});
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
        setIsFeaturedNotAllowed(false);
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

    const checkAvailableFeaturedHandler = () => {
        return checkAvailableFeatured(propertyObj.id).then((res) => {
            if (!res.isAllowed) {
                setPropertyObj({...propertyObj, is_featured: false});
                setFeaturedNotAllowedMsg('You are not allowed to have more than one featured and published property!')
            }
            setIsFeaturedNotAllowed(!res.isAllowed);
        });
    }


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
                        <Grid item xs={12} sm={2}>
                            <Typography component={'span'}> with parking?
                                <ToggleButton
                                    sx={{marginLeft:"1%"}}
                                    color={'success'}
                                    value="check"
                                    selected={propertyObj.with_parking}
                                    onChange={() => {
                                        setPropertyObj({...propertyObj, with_parking: !propertyObj.with_parking});
                                    }}
                                >
                                    <CheckIcon />
                                </ToggleButton>
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <Typography component={'span'}> is Best Deal?
                                <ToggleButton
                                    sx={{marginLeft:"1%"}}
                                    color={'success'}
                                    value="check"
                                    disabled={user.role !== 'admin'}
                                    selected={propertyObj.is_best_deal}
                                    onChange={() => {
                                        setPropertyObj({...propertyObj, is_best_deal: !propertyObj.is_best_deal});
                                    }}
                                >
                                    <CheckIcon />
                                </ToggleButton>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2} sx={{textAlign:'right'}}>
                            <Typography component={'span'}> is Published?
                                <ToggleButton
                                    sx={{marginLeft:"1%"}}
                                    color={'success'}
                                    value="check"
                                    selected={propertyObj.published}
                                    onChange={() => {
                                        setPropertyObj({...propertyObj, published: !propertyObj.published});
                                    }}
                                >
                                    <CheckIcon />
                                </ToggleButton>
                            </Typography>
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
                        <Grid item xs={12} sm={1}>
                            <Typography sx={{textAlign:'center'}}> is Top?
                                <ToggleButton
                                    sx={{marginLeft:"1%"}}
                                    color={'success'}
                                    value="check"
                                    disabled={user.role !== 'admin'}
                                    selected={propertyObj.is_top}
                                    onChange={() => {
                                        setPropertyObj({...propertyObj, is_top: !propertyObj.is_top});
                                    }}
                                >
                                    <CheckIcon />
                                </ToggleButton>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography sx={{textAlign:'center'}}> is Featured?
                                <ToggleButton
                                    sx={{marginLeft:"1%"}}
                                    color={'success'}
                                    value="check"
                                    disabled={user.role !== 'admin'}
                                    selected={propertyObj.is_featured}
                                    onChange={() => {
                                        setPropertyObj({...propertyObj, is_featured: !propertyObj.is_featured});
                                        checkAvailableFeaturedHandler();
                                    }}
                                >
                                    <CheckIcon />
                                </ToggleButton>
                                <br/>
                                {featuredNotAllowedMsg && <>
                                    <span style={{color:"red", fontSize:'10px'}}>
                                        {featuredNotAllowedMsg}
                                    </span>
                                    <br/>
                                    <Button
                                        variant="outlined"
                                        sx={{mt: 1, mb: 1}}
                                        size={'small'}
                                        onClick={() => {
                                            setFeaturedNotAllowedMsg(undefined)
                                        }}
                                    >
                                       close
                                    </Button>
                                </>}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="description"
                                name="description"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                error={errors.description}
                                helperText={errorsLayout.description}
                                value={propertyObj.description}
                                onChange={(e) => {
                                    setPropertyObj({...propertyObj, description: e.target.value});
                                    setErrors({
                                        ...errors,
                                        description: validateForm(e.target.value, 'string',{min:3,max:150})
                                    });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {propertyTypes.length > 0 &&
                                <Typography component={'span'} sx={{marginRight: '1%'}}>
                                    <TextField
                                        value={propertyObj.type}
                                        id="type"
                                        name="type"
                                        sx={{width: '100%'}}
                                        select // tell TextField to render select
                                        label="Type"
                                        onChange={ (e) => {
                                            setPropertyObj({...propertyObj, type: e.target.value});
                                        }}
                                    >
                                    {propertyTypes.map( (type, key) => {
                                        return <MenuItem key={key} value={type}>{type}</MenuItem>
                                    })}
                                    </TextField>
                                </Typography>
                            }
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