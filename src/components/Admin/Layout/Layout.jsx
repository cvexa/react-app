import Box from "@mui/material/Box";
import SideBar from "../SideBar/SideBar.jsx";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import drawerWidth from "../SideBar/SideBar.jsx";
import {DialogProvider} from "../../../contexts/Dialog.jsx";
import {AlertProvider} from "../../../contexts/Alert";

export default function AdminLayout(props) {
    return (
        <Box sx={{ display: 'flex' }}>
            <SideBar />

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <DialogProvider>
                    <AlertProvider>
                        {props.children}
                    </AlertProvider>
                </DialogProvider>
            </Box>
        </Box>
    );
}