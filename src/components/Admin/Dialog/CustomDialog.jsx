import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {useDialogContext} from "../../../contexts/Dialog.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog({title, content, actionBtnText})
{
    const { openDialog, setOpenDialog } = useDialogContext();
    const { dialogAction, setDialogAction } = useDialogContext();

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleAgree = () => {
        setDialogAction(true);
        setOpenDialog(false);
    }

    return (
        <>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Close</Button>
                    {actionBtnText && <Button variant="contained" color="success" onClick={handleAgree}>{actionBtnText}</Button>}
                </DialogActions>
            </Dialog>
        </>
    );
}