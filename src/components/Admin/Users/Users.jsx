import React, {useEffect, useState} from "react";
import {useUserContext} from "../../../contexts/User.jsx";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import PaginatedTable from "../PaginatedTable/PaginatedTable.jsx";
import {deleteUserById, getPaginatedUsers} from "../../../services/user.jsx";
import {usersTableSkeleton} from "../../../utils/users.js";
import Profile from "../../Profile/Profile";
import ViewProperty from "../ViewProperty/ViewProperty.jsx";
import {useDialogContext} from "../../../contexts/Dialog.jsx";
import {useAlertContext} from "../../../contexts/Alert.jsx";
import GenericNotFound from "../../GenericNotFound/GenericNotFound";

export default function Users() {
    const { user, setUser } = useUserContext();
    const [users, setUsers] = useState([]);
    const perPage = 5;
    const [pagination, setPagination] = useState({
        page:0,
        count:0,
        total:0,
    });
    const navigate = useNavigate();
    const { openDialog, setOpenDialog } = useDialogContext();
    const { dialogAction, setDialogAction } = useDialogContext();
    const { dialogContent, setDialogContent } = useDialogContext();
    const [deleteId, setDeleteId] = useState();
    const {trigger, setTrigger} = useAlertContext();
    const {msg, setMsg} = useAlertContext();

    useEffect(() => {
        try {
            getPaginatedUsers(perPage).then( (res) => {
                setUsers(res.data);
                setPagination({
                    page: res.current_page,
                    count: res.last_page,
                    total: res.total
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
                count: res.last_page,
                total: pagination.total
            })
        });
    };

    const onSettingsClickHandler = (id) => {
        setDialogContent({
            title: 'Manage User',
            content: <Profile userId={id} usersList={users} syncUsers={setUsers} syncPagination={setPagination} pagination={pagination}/>,
            actionBtnText: ''
        })
        setOpenDialog(true);
    }

    const onDeleteClickHandler = (id) => {
        setDeleteId(id);
        setDialogContent({
            title: 'Are you sure?',
            content: 'Are you sure that you want to delete your profile? If you agree your account will be permanently deleted!',
            actionBtnText: 'Agree'
        })
        setOpenDialog(true);
    }

    const handleDeleteUser = () => {
        try {
            deleteUserById(deleteId).then(() => {
                if(deleteId === user.id) {
                    localStorage.clear();
                    setUser({});
                    navigate('/');
                }else{
                    users.map((data, position) => {
                        Object.keys(users[position]).map((key) => {
                            if (users[position] && users[position].id === deleteId) {
                                delete users[position];
                            }
                        })
                        setUsers(users);
                        setPagination({...pagination, total: pagination.total - 1})
                    })
                }
                setTrigger(true);
                setMsg('Successfully deleted user!');
            });
        }catch (e) {
            console.log(e);
        }
    }

    useEffect( () => {
        if(dialogAction) {
            setDialogAction(false);
            handleDeleteUser();
        }
    }, [dialogAction])

    if(user.role !== 'admin') {
        return <GenericNotFound />;
    }

    return (
        <>
            <h2 style={{marginBottom:"2%"}}>Users total : ( {users && pagination.total} )</h2>
            <div style={{marginBottom:"2%"}}>

            </div>
            <div style={{ height: 400, width: '100%' }}>
                {users &&
                    <>
                        <PaginatedTable rowsData={users} pagination={pagination} tableDataSkeleton={usersTableSkeleton} handlePageChange={handleChangePage} actions={{
                            settings: onSettingsClickHandler,
                            onDeleteClickHandler: onDeleteClickHandler
                        }}/>
                    </>
                }
            </div>
        </>
    );
}