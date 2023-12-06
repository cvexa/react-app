import {createContext, useContext, useState} from "react";
import {getUser, setUser} from "../utils/user.js";

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
        </DialogContext.Provider>
    );
}