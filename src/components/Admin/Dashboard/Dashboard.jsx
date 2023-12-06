import * as React from 'react';
import {useUserContext} from "../../../contexts/User.jsx";
import {useEffect, useState} from "react";
import {deleteProperty, getPaginatedProperties, GetTop} from "../../../services/properties.jsx";
import {propertiesTableSkeleton} from "../../../utils/properties.js";
import PaginatedTable from "../PaginatedTable/PaginatedTable.jsx";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useDialogContext} from "../../../contexts/Dialog.jsx";
import CustomDialog from "../CustomDialog/CustomDialog.jsx";
import ViewProperty from "../ViewProperty/ViewProperty.jsx";
import {Alert, Snackbar} from "@mui/material";
import PropertyForm from "../PropertyForm/PropertyForm.jsx";
import {useAlertContext} from "../../../contexts/Alert.jsx";


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
    const { dialogContent, setDialogContent } = useDialogContext();
    const [deleteId, setDeleteId] = useState();
    const {trigger, setTrigger} = useAlertContext();
    const {msg, setMsg} = useAlertContext();

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

    const onCreateClickHandler = () => {
        setDialogContent({
            title: 'Create Property',
            content: <PropertyForm />,
            isFullScreen: true
        });
        setOpenDialog(true);
    }

    const onEditClickHandler = (id) => {
        setDialogContent({
            title: 'Create Property',
            content: <PropertyForm propId={id} properties={properties} syncProperties={setProperties}/>,
            isFullScreen: true
        });
        setOpenDialog(true);
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

    useEffect( () => {
        if(dialogAction) {
            setDialogAction(false);
            deleteProperty(deleteId).then( () => {
                setTrigger(true);
                setMsg('Successfully deleted property!')
                properties.map( (data, position) => {//refresh properties list without the deleted one
                    Object.keys(properties[position]).map( (key) => {
                        if(properties[position] && properties[position].id === deleteId) {
                            delete properties[position];
                            setPagination({...pagination, total: pagination.total -1})
                        }
                    })
                })
                setProperties(properties);
            })
        }
    }, [dialogAction])


    return (
        <>
            <div style={{marginBottom:"2%"}}>
                <h2 style={{marginBottom:"2%"}}>Properties total : ( {properties && pagination.total} )</h2>
                <Button variant="outlined" size="small" onClick={onCreateClickHandler}>
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
                {dialogContent && <CustomDialog title={dialogContent.title} content={dialogContent.content} actionBtnText={dialogContent.actionBtnText} isFullScreen={dialogContent.isFullScreen}/>}
            </div>
        </>
    );
}