import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu.js";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import * as React from 'react';
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox.js";
import MailIcon from "@mui/icons-material/Mail.js";
import ListItemText from "@mui/material/ListItemText";
import CssBaseline from "@mui/material/CssBaseline";
import {useLocation, Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useUserContext} from "../../../contexts/User.jsx";
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {logOut} from "../../../services/user.jsx";

export const drawerWidth = 240;

export default function SideBar(props) {
    const { user, setUser } = useUserContext();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const nvaigate = useNavigate();
    const [menuItems, setMenuItems] = useState({});

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const [path, setPath] = useState("");

    let location = useLocation();

    useEffect(() => {
        setPath(location.pathname);
    }, [location.pathname]);

    // const menuItems = {'Dashboard':'/dashboard', 'Users':'/users','Home':'/'};

    const adminItems = {
        'Dashboard':
            {
                url:'/dashboard',
                icon : <DashboardIcon />
            },
        'Users':
            {
                link: '/users',
                icon: <PeopleIcon />
            },
        'Home':
            {
                url:'/',
                icon: <PeopleIcon />
            }
    };

    const userItems = {
        Dashboard : {...adminItems.Dashboard},
        Home: {...adminItems.Home}
    };

    useEffect( () => {
        if(user.role === 'user') {
            setMenuItems(userItems);
        }else{
            setMenuItems(adminItems);
        }
    }, [])

    const handleLogOut = () => {
        logOut().finally( () => {
            localStorage.clear();
            setUser({});
            nvaigate('/');
        });

    }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {menuItems && Object.keys(menuItems).map((textKey, i) => (
                    <Link key={textKey} to={menuItems[textKey].url}>
                        <ListItem key={textKey} disablePadding sx={{color:"#000"}}>
                            <ListItemButton selected={'/'+textKey.toLowerCase() === path ? true : false}>
                                <ListItemIcon>
                                    {menuItems[textKey].icon}
                                </ListItemIcon>
                                <ListItemText primary={textKey} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
                <ListItem disablePadding sx={{color:"#000"}} onClick={handleLogOut}>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Log out'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
        </div>
    );


    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Administration
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    )
}