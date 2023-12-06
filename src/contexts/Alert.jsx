import React, {createContext, useContext, useState} from "react";
import {Alert, Snackbar} from "@mui/material";

const AlertContext = createContext({});

export const useAlertContext = () => useContext(AlertContext);

export function AlertProvider({ children }) {
    const [trigger, setTrigger] = useState(false);
    const [msg, setMsg] = useState('');
    const [severity, setSeverity] = useState('success');

    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setTrigger(false);
    };

    return (
        <AlertContext.Provider value={{trigger, setTrigger, msg, setMsg, severity, setSeverity}}>
            {children}
            {trigger &&
                <Snackbar
                    open={trigger}
                    onClose={handleCloseMessage}
                    autoHideDuration={4000}>
                    <Alert onClose={handleCloseMessage} severity={severity} sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
            }
        </AlertContext.Provider>
    );
}