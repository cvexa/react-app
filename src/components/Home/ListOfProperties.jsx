import React, {useEffect, useState} from "react";
import {getPaginatedProperties} from "../../services/properties.jsx";
import {CircularProgress, Pagination} from "@mui/material";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";

export default function ListOfProperties() {
    const [properties, setProperties] = useState([]);
    const perPage = 6;
    const [pagination, setPagination] = useState({
        page:1,
        count:0,
    })

    useEffect( () => {
        getPaginatedProperties(perPage).then( (res) => {
            setProperties(res);
            setPagination({
                page: res.current_page,
                count: res.last_page
            })
        });
    }, []);

    const handlePageChange = (event, page) => {
        getPaginatedProperties(perPage, page).then( (res) => {
            setProperties(res);
            setPagination({
                page: res.current_page,
                count: res.last_page
            })
        });
    };

    return (
        <div className="properties section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 offset-lg-4">
                        <div className="section-heading text-center">
                            <h6>| Properties</h6>
                            <h2>We Provide The Best Property You Like</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {properties.data ?
                        properties.data.map((property, key) => {
                            return <div key={key} className="col-lg-4 col-md-6">
                                <div className="item">
                                    <a href="property-details.html"><img src="assets/images/property-01.jpg"
                                                                         alt=""/></a>
                                    <span className="category" style={{textTransform: 'capitalize'}}>{property.type}</span>
                                    <h6>${property.price}</h6>
                                    <h4><a href="property-details.html">{property.title}</a></h4>
                                    <ul>
                                        <li>Safety: <span>{property.safety}</span></li>
                                        <li>Number of rooms: <span>{property.number_of_rooms}</span></li>
                                        <li>Area: <span>{property.quadrature}m2</span></li>
                                        <li>Floor: <span>{property.floor_number}</span></li>
                                        <li>Parking: <span>{property.with_parking === 1 ? 'yes' : 'no'}</span></li>
                                    </ul>
                                    <div className="main-button">
                                        <Link to={`/property/${property.id}`}>view more</Link>
                                    </div>
                                </div>
                            </div>
                        })
                        :
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress size={'10rem'} />
                        </Box>
                    }
                </div>
                {properties && <Pagination count={pagination.count} page={pagination.page} onChange={handlePageChange}/>}
            </div>
        </div>
    );
}