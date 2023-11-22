import PropertyInfoSideBar from "../Home/PropertyInfoSideBar.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {GetPropertyById} from "../../services/properties.jsx";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import React from "react";

export default function SingleProperty() {
    const [property, setProperty] = useState();
    const {id} = useParams();

    useEffect(() => {
        try {
            GetPropertyById(id).then(res => {
                setProperty(res);
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <>
            <div className="page-heading header-text">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <span className="breadcrumb"><a href="#">Home</a>  /  Single Property</span>
                            <h3>Single Property</h3>
                        </div>
                    </div>
                </div>
            </div>

            {property ?
                <div className="single-property section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="main-image">
                                    <img src={property.pic} alt="" style={{width:'800px', height:'600px'}}/>
                                </div>
                                <div className="main-content">
                                    <span className="category">{property.type}</span>
                                    <h4>{property.title}</h4>
                                    <p>{property.description}</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <PropertyInfoSideBar property={property}/>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress size={'10rem'}/>
                </Box>
            }
        </>
    );
}