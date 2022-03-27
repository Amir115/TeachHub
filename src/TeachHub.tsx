import {useState, useEffect} from "react";
import {useNavigate, Outlet, useLocation} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';

import icon from './icon.png';

import useAuth from './hooks/auth/use-auth';
import { getRoute } from './Routes/Routes';
import { ManagementSystemDrawer } from './Routes/NavigationDrawer';
import { Column } from "./theme/layout";
import { ThemeProvider } from "./theme/theme";
import {Box} from "@mui/material";

const TeachHub = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const location = useLocation()
    const navigate = useNavigate();
    const userSession = useAuth();

    const route = getRoute(location);
    const Bread = route && route.path !== '/' ? <>{'>'} {route.name}</> : <></>

    useEffect(() =>{
        if (!userSession) {
            navigate('/auth');
        }
    }, [userSession]);

    return (
        <ThemeProvider>
            <CssBaseline/>
            <AppBar position='relative'>
                <Toolbar sx={{alignItems:'baseline', padding: 1}}>
                    {userSession && <IconButton color="inherit" onClick={() => setIsDrawerOpen(x => !x)} edge="start">
                        <MenuIcon/>
                    </IconButton>}
                    <Box sx={{display: 'flex', cursor: 'pointer'}}>
                        <img height="50" src={icon} alt='icon' onClick={() => navigate('/')}/>
                    </Box>
                    <Typography variant="h6" color="inherit" noWrap>
                        {Bread}
                    </Typography>
                </Toolbar>
            </AppBar>

            {userSession && <ManagementSystemDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}/>}

            <Column sx={{p: 3, flex: 1, justifyContent: "space-between" ,overflow: 'auto'}}>
                <Column sx={{flex: 1}}><Outlet /></Column>
                <Typography sx={{mt: 2, color: 'text.disabled'}} variant="body2">
                    2022 © TeachHub
                </Typography>
            </Column>
        </ThemeProvider>
    );
}

export default TeachHub;