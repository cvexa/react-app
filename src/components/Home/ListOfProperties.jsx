import React, {useEffect, useState} from "react";
import {getPaginatedProperties} from "../../services/properties.jsx";
import {CircularProgress, Pagination} from "@mui/material";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import PropertyBox from "./PropertyBox";

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
                        properties.data.map((property) => {
                            return <PropertyBox key={property.id} property={property}/>
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