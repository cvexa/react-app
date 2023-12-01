import {createContext, useContext, useState} from "react";
import {getUser, setUser} from "../utils/user.js";

const DialogContext = createContext({});

export const useDialogContext = () => useContext(DialogContext);

export function DialogProvider({ children }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [agree, setAgree] = useState(false);

    return (
        <DialogContext.Provider value={{openDialog, setOpenDialog, agree, setAgree}}>
            {children}
        </DialogContext.Provider>
    );
}