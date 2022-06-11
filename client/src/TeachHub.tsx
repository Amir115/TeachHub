import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
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
import { Column, Row } from "./theme/layout";
import { ThemeProvider } from "./theme/theme";
import { Box, Stack } from "@mui/material";
import Avatar from '@mui/material/Avatar';

const TeachHub = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation()
  const navigate = useNavigate();
  const userSession = useAuth();

  const route = getRoute(location);

  useEffect(() => {
    if (!userSession) {
      navigate('/auth');
    }
  }, [userSession]);

  return (
    <ThemeProvider>
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar sx={{ padding: 1, justifyContent: 'space-between' }}>
          <Row sx={{ alignItems: 'baseLine' }}>
            {userSession && <IconButton color="inherit" onClick={() => setIsDrawerOpen(x => !x)} edge="start">
              <MenuIcon />
            </IconButton>}
            <Box sx={{ display: 'flex', cursor: 'pointer' }}>
              <img height="50" src={icon} alt='icon' onClick={() => navigate('/')} />
            </Box>
          </Row>
          {userSession && <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='h5'>
              {`${userSession.firstName} ${userSession.lastName}`}
            </Typography>
            <Avatar sx={{ cursor: 'pointer' }} onClick={() => navigate('/profile')} />
          </Stack>}
        </Toolbar>
      </AppBar>

      {userSession && <ManagementSystemDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />}

      <Column sx={{ p: 3, flex: 1, justifyContent: "space-between", overflow: 'auto' }}>
        <Column sx={{ flex: 1, maxHeight: 1 }}><Outlet /></Column>
        <Typography sx={{ color: 'text.disabled', position: 'fixed', bottom: '20px' }} variant="body2">
          2022 © TeachHub
        </Typography>
      </Column>
    </ThemeProvider>
  );
}

export default TeachHub;