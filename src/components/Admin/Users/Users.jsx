import React, {useEffect, useState} from "react";
import {useUserContext} from "../../../contexts/User.jsx";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import PaginatedTable from "../PaginatedTable/PaginatedTable.jsx";
import {getPaginatedUsers} from "../../../services/user.jsx";
import {usersTableSkeleton} from "../../../utils/users.js";

export default function Users() {
    const { user, setUser } = useUserContext();
    const [users, setUsers] = useState([]);
    const perPage = 1;
    const [pagination, setPagination] = useState({
        page:0,
        count:0,
    });
    const navigate = useNavigate();

    useEffect(() => {
        try {
            getPaginatedUsers(perPage).then( (res) => {
                setUsers(res.data);
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
        getPaginatedUsers(perPage, page).then( (res) => {
            setUsers(res.data);
            setPagination({
                page: res.current_page,
                count: res.last_page
            })
        });
    };

    const onViewClickHandler = (id) => {
        console.log(id);
    }

    const onEditClickHandler = (id) => {
        console.log(id);
    }

    const onDeleteClickHandler = (id) => {
        console.log(id);
    }

    return (
        <>
            <h2 style={{marginBottom:"2%"}}>Users</h2>
            <div style={{marginBottom:"2%"}}>
                <Button variant="outlined" size="small">
                    Create
                </Button>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                {users &&
                    <>
                        <PaginatedTable rowsData={users} pagination={pagination} tableDataSkeleton={usersTableSkeleton} handlePageChange={handleChangePage} actions={{
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