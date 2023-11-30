import * as React from 'react';
import {useUserContext} from "../../../contexts/User.jsx";
import {useEffect, useState} from "react";
import { DataGrid } from '@mui/x-data-grid';
import {getPaginatedProperties, GetTop} from "../../../services/properties.jsx";
import {propertiesTableSkeleton} from "../../../utils/properties.js";
import PaginatedTable from "../PaginatedTable/PaginatedTable.jsx";
import TableActions from "../TableActions/TableActions.jsx";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";


export default function Dashboard() {
    const { user, setUser } = useUserContext();
    const [properties, setProperties] = useState([]);
    const perPage = 5;
    const [pagination, setPagination] = useState({
        page:0,
        count:0,
    });
    const navigate = useNavigate();

    if(user.role == 'user') {
        return (<>
            Wellcome {user.name}
        </>);
    }

    useEffect(() => {
        try {
            getPaginatedProperties(perPage).then( (res) => {
                setProperties(res.data);
                setPagination({
                    page: res.current_page,
                    count: res.last_page,
                })
            });
        }catch (e) {
            console.log(e);
        }
    },[]);

    const handleChangePage = (event, page) => {
        getPaginatedProperties(perPage, page).then( (res) => {
            setProperties(res.data);
            setPagination({
                page: res.current_page,
                count: res.last_page
            })
        });
    };

    const onViewClickHandler = (id) => {
        navigate(`/property/${id}`)
    }

    const onEditClickHandler = (id) => {
        console.log(id);
    }

    const onDeleteClickHandler = (id) => {
        console.log(id);
    }


    return (
        <>
            <div style={{marginBottom:"2%"}}>
                <h2 style={{marginBottom:"2%"}}>Properties</h2>
                <Button variant="outlined" size="small">
                    Create
                </Button>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                {properties &&
                    <>
                        <PaginatedTable rowsData={properties} pagination={pagination} tableDataSkeleton={propertiesTableSkeleton} handlePageChange={handleChangePage} actions={{
                            onViewClickHandler : onViewClickHandler,
                            onEditClickHandler : onEditClickHandler,
                            onDeleteClickHandler : onDeleteClickHandler
                        }}/>
                    </>
                }
            </div>
        </>
    );
}