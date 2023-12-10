import React, {useEffect, useState} from "react";
import {
    getPaginatedProperties,
    getPaginatedPropertiesByType,
    GetPropertyTypes
} from "../../services/properties.jsx";
import PropertyBox from "../Home/PropertyBox.jsx";
import Box from "@mui/material/Box";
import {CircularProgress, Pagination} from "@mui/material";


export default function ListOfProperties() {
    const [properties, setProperties] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState({});
    const perPage = 6;
    const [pagination, setPagination] = useState({
        page: 1,
        count: 0,
    })
    const [filterType, setFilterType] = useState('null');

    useEffect(() => {
        try {
            getPaginatedPropertiesByType(perPage, 1, null).then((res) => {
                setProperties(res);
                setPagination({
                    page: res.current_page,
                    count: res.last_page
                })
            });

            GetPropertyTypes().then((res) => {
                if (!res.message) {
                    setPropertyTypes(res);
                } else {
                    throw new Error(res.message);
                }
            })
        } catch (e) {//to do what to do when error come in on home page
            console.log(e);
        }
    }, []);

    const handleFilterClick = (type) => {
        if(!type) {
            type = 'null';
        }
        setFilterType(type);
        getPaginatedPropertiesByType(perPage, 1 ,type).then((res) => {
            setProperties(res);
            setPagination({
                page: res.current_page,
                count: res.last_page
            })
        });
    }

    const handlePageChange = (event, page) => {
        getPaginatedPropertiesByType(perPage, page, filterType).then((res) => {
            setProperties(res);
            setPagination({
                page: res.current_page,
                count: res.last_page
            })
        });
    };

    return (
        <div className="section properties">
            <div className="container">
                <ul className="properties-filter">
                    <li>
                        <a className={filterType === 'null' ? 'is_active' : ''} href="#!" data-filter="*" onClick={ (e) => {
                            e.preventDefault();
                            handleFilterClick('null')
                        }}>Show All</a>
                    </li>
                    {propertyTypes.length > 0 ? propertyTypes.map((prop, key) => {
                        return <li key={key}>
                            <a href="#!" data-filter=".adv" className={filterType === prop.toLowerCase() ? 'is_active' : ''} onClick={ (e) => {
                                e.preventDefault();
                                handleFilterClick(prop.toLowerCase())
                            }}>{prop}</a>
                        </li>
                    }) : <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <CircularProgress size={'10rem'}/>
                    </Box>
                    }
                </ul>
                <div className="row">
                    {properties &&
                        <Pagination count={pagination.count} page={pagination.page} onChange={handlePageChange}/>}
                </div>
                <div className="row properties-box">
                    {properties.data ?
                        properties.data.map((property) => {
                            return <PropertyBox key={property.id} property={property}/>
                        })
                        :
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress size={'10rem'}/>
                        </Box>
                    }
                </div>
            </div>
        </div>
    );
}