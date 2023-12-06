import Button from "@mui/material/Button";
import SettingsIcon from '@mui/icons-material/Settings';

export default function TableActions({onViewClickHandler, onEditClickHandler, onDeleteClickHandler, settings, dataId }) {
    return (
        <>
            {onViewClickHandler &&
                <Button variant="contained" size="small" color={"success"} sx={{marginRight: '2%', marginBottom: '1%'}}
                        onClick={() => onViewClickHandler(dataId)}>View</Button>
            }
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
    );
}