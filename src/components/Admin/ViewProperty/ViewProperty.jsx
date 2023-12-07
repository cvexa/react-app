import {Card, CardActions, CardContent, CardMedia, Chip, CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {GetPropertyById} from "../../../services/properties.jsx";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import vstyle from "./ViewProperty.module.css";
import {useUserContext} from "../../../contexts/User.jsx";

export default function ViewProperty({id, editHandler}) {
    const navigate = useNavigate();
    const [property, setProperty] = useState({});
    const { user, setUser } = useUserContext();

    useEffect(() => {
        setProperty({});
        GetPropertyById(id).then((res) => {
            setProperty(res);
        })
    }, [id]);

    const handleViewClick = () => {
        navigate('/property/' + id);
    }

    return (
        <div>
            {property ?
                <Card sx={{width: 450}}>
                    {property.pic ?
                        <CardMedia
                            sx={{height: 140, width: 450, cursor: 'pointer'}}
                            image={property.pic}
                            title={property.title}
                            onClick={handleViewClick}
                        />
                        :
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress/>
                        </Box>
                    }
                    <CardContent>
                        <div>
                            <Typography gutterBottom variant="h5" component="span">
                                {property.title}
                            </Typography>
                        </div>
                        <Typography variant="body2" color="text.secondary" sx={{textAlign: 'left', marginTop: '2%', display: 'inline-block'}} component="span">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>Price <Chip label={'$ ' + property.price} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>location <Chip label={property.location} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>floor number <Chip label={property.floor_number ?? '-'} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>number of rooms <Chip label={property.number_of_rooms ?? '-'} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>with parking <Chip label={property.with_parking == 1 ? 'yes' : 'no'} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>type <Chip label={property.type} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>contract <Chip label={property.contract} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>payment process <Chip label={property.payment_process} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>safety <Chip label={property.safety} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>quadrature <Chip label={property.quadrature} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>description <Chip label={property.description} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>is top <Chip label={property.is_top === 1 ? 'yes' : 'no'} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>is featured <Chip label={property.is_featured === 1 ? 'yes' : 'no'} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>is best_deal <Chip label={property.is_best_deal === 1 ? 'yes' : 'no'} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>created by <Chip label={property.creator?.name} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>published <Chip label={property.published === 1 ? 'yes' : 'no'} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>created at <Chip label={property.created_at && new Date(property.created_at).toLocaleDateString()} variant="outlined"/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={vstyle.textGrid}>updated at <Chip label={property.updated_at && new Date(property.updated_at).toLocaleDateString()} variant="outlined"/></div>
                                </Grid>
                            </Grid>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={handleViewClick}>view on site</Button>
                        <Button variant="outlined" size="small" onClick={() => editHandler(property.id)}>edit</Button>
                    </CardActions>
                </Card>
                :
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress/>
                </Box>
            }
        </div>
    );
}