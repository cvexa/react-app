import Button from "@mui/material/Button";
import {useEffect} from "react";

export default function TableActions({onViewClickHandler, onEditClickHandler, onDeleteClickHandler, dataId }) {
    return (
        <>
            <Button variant="contained" size="small" color={"success"} sx={{marginRight:'2%', marginBottom: '1%'}} onClick={() => onViewClickHandler(dataId)}>View</Button>
            <Button variant="contained" size="small" sx={{marginRight:'2%', marginBottom: '1%'}} onClick={() => onEditClickHandler(dataId)}>Edit</Button>
            <Button variant="contained" size="small" color={"error"} sx={{marginRight:'2%', marginBottom: '1%'}} onClick={() => onDeleteClickHandler(dataId)}>Delete</Button>
        </>
    );
}