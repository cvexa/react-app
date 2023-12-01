import * as React from 'react';
import {useUserContext} from "../../../contexts/User.jsx";
import {useEffect, useState} from "react";
import {deleteProperty, getPaginatedProperties, GetTop} from "../../../services/properties.jsx";
import {propertiesTableSkeleton} from "../../../utils/properties.js";
import PaginatedTable from "../PaginatedTable/PaginatedTable.jsx";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useDialogContext} from "../../../contexts/Dialog.jsx";
import CustomDialog from "../Dialog/CustomDialog.jsx";
import ViewProperty from "../ViewProperty/ViewProperty.jsx";
import {Alert, Snackbar} from "@mui/material";


export default function Dashboard() {
    const { user, setUser } = useUserContext();
    const [properties, setProperties] = useState([]);
    const perPage = 5;
    const [pagination, setPagination] = useState({
        page:0,
        count:0,
        total:0,
    });
    const navigate = useNavigate();
    const { openDialog, setOpenDialog } = useDialogContext();
    const { dialogAction, setDialogAction } = useDialogContext();
    const [dialogContent, setDialogContent] = useState({
        title: '',
        content: '',
        actionBtnText: ''
    });
    const [deleteId, setDeleteId] = useState();
    const [message, setMessage] = useState(false);

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
                    total: res.total
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
                count: res.last_page,
                total: pagination.total
            })
        });
    };

    const onViewClickHandler = (id) => {
        setDialogContent({
            title: 'View property',
            content: <ViewProperty id={id}/>,
            actionBtnText: ''
        })
        setOpenDialog(true);
    }

    const onEditClickHandler = (id) => {
        console.log(id);
    }

    const onDeleteClickHandler = (id) => {
        setDeleteId(id);
        setDialogContent({
            title: 'Delete property',
            content: 'Are you sure that you want to delete this property? If you agree this property will be permanently deleted!',
            actionBtnText: 'agree'
        })
        setOpenDialog(true);
    }

    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setMessage(false);
    };

    useEffect( () => {
        if(dialogAction) {
            setDialogAction(false);
            deleteProperty(deleteId).then( () => {
                setMessage(true);
            })
        }
    }, [dialogAction])


    return (
        <>
            <div style={{marginBottom:"2%"}}>
                <h2 style={{marginBottom:"2%"}}>Properties total : ( {properties && pagination.total} )</h2>
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
                {dialogContent && <CustomDialog title={dialogContent.title} content={dialogContent.content} actionBtnText={dialogContent.actionBtnText}/>}
                {message &&
                    <Snackbar
                        open={message}
                        onClose={handleCloseMessage}
                        autoHideDuration={4000}>
                        <Alert onClose={handleCloseMessage} severity="success" sx={{ width: '100%' }}>
                            Successfully deleted property !
                        </Alert>
                    </Snackbar>
                }
            </div>
        </>
    );
}