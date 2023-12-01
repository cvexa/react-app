import {createContext, useContext, useState} from "react";
import {getUser, setUser} from "../utils/user.js";

const DialogContext = createContext({});

export const useDialogContext = () => useContext(DialogContext);

export function DialogProvider({ children }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogAction, setDialogAction] = useState(false);

    return (
        <DialogContext.Provider value={{openDialog, setOpenDialog, dialogAction, setDialogAction}}>
            {children}
        </DialogContext.Provider>
    );
}