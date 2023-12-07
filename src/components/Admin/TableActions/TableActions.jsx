import Button from "@mui/material/Button";
import SettingsIcon from '@mui/icons-material/Settings';
import {useUserContext} from "../../../contexts/User.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function TableActions({onViewClickHandler, onEditClickHandler, onDeleteClickHandler, settings, dataId, creatorId }) {
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();

    useEffect( () => {
        console.log(creatorId);
    });

    return (
        <>
            {onViewClickHandler &&
                <Button variant="contained" size="small" color={"success"} sx={{marginRight: '2%', marginBottom: '1%'}}
                        onClick={() => user.role === 'admin' ? onViewClickHandler(dataId) : navigate('/property/'+dataId)}>View</Button>
            }
            {user.role === 'admin' || creatorId === user.id ? (
                <>
                    {onEditClickHandler &&
                        <Button variant="contained" size="small" sx={{marginRight: '2%', marginBottom: '1%'}}
                                onClick={() => onEditClickHandler(dataId)}>Edit</Button>
                    }
                    {onDeleteClickHandler &&
                        <Button variant="contained" size="small" color={"error"} sx={{marginRight: '2%', marginBottom: '1%'}}
                                onClick={() => onDeleteClickHandler(dataId)}>Delete</Button>
                    }
                    {settings &&
                        <Button variant="contained" size="small" color={"success"} sx={{marginRight: '2%', marginBottom: '1%'}}
                            onClick={() => settings(dataId)}><SettingsIcon /></Button>
                    }
                </>
            ) : ''}
        </>
    );
}