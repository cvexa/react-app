import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {useEffect, useState} from "react";
import {GetTop} from "../../services/properties.jsx";
import {useUserContext} from "../../contexts/User.jsx";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";

export default function MainBanner() {
    const [properties, setProperties] = useState([]);
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();

    useEffect( () => {
        try {
            GetTop( 3).then((res) => {
                if(!res.message) {
                    setProperties(res);
                }else {
                    throw new Error(res.message);
                }
            });
        }catch (e) {//to do what to do when error come in on home page
            navigate('/')
        }
    }, []);

    return (
        <div className="main-banner">
            {properties.length > 0 ?
                <OwlCarousel items={1} className="owl-carousel owl-banner main-banner" loop margin={10} nav>
                    {properties.map((property, key) => {
                       return (
                            <div key={key} className="item" style={{backgroundImage: `url(${property.pic})`}}>
                                <div className="header-text">
                                    <span className="category">{property.location}</span>
                                    <h2>{property.title}</h2>
                                </div>
                            </div>
                       );
                    })}
                </OwlCarousel>
            : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress size={'10rem'} />
                </Box>
            }
        </div>
    );
}