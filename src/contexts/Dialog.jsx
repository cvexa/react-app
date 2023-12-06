import React, {createContext, useContext, useState} from "react";
import {getUser, setUser} from "../utils/user.js";
import CustomDialog from "../components/Admin/CustomDialog/CustomDialog.jsx";

const DialogContext = createContext({});

export const useDialogContext = () => useContext(DialogContext);

export function DialogProvider({ children }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogAction, setDialogAction] = useState(false);
    const [dialogContent, setDialogContent] = useState({
        title: '',
        content: '',
        actionBtnText: '',
        isFullScreen: false
    });

    return (
        <DialogContext.Provider value={{openDialog, setOpenDialog, dialogAction, setDialogAction, dialogContent, setDialogContent}}>
            {children}
            {dialogContent && <CustomDialog title={dialogContent.title} content={dialogContent.content} actionBtnText={dialogContent.actionBtnText} isFullScreen={dialogContent.isFullScreen}/>}
        </DialogContext.Provider>
    );
}