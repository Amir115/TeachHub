import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { CenteredColumn } from '../../theme/layout';

import Login from './Login'
import SignUp from './SignUp/SignUp'
import useAuth from '../../hooks/auth/use-auth';

const Auth = () => {
    const user = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, []);

    return (
        <CenteredColumn sx={{flex: 1}}>
            <Paper variant="outlined" sx={{p: 2}}>
                <CenteredColumn>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Outlet />
                </CenteredColumn>
             </Paper>
        </CenteredColumn>
    )
};

export default Auth;

export { Login, SignUp }