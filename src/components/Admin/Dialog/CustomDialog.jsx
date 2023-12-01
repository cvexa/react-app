import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {useDialogContext} from "../../../contexts/Dialog.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog({title, text})
{
    const { openDialog, setOpenDialog } = useDialogContext();
    const { agree, setAgree } = useDialogContext();

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleAgree = () => {
        setAgree(true);
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
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleAgree}>Agree</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}