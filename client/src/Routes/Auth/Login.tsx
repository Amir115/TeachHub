import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import useLogin from '../../hooks/auth/use-login'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [login, isLoading, error] = useLogin()

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
        event.preventDefault();

        try {
            await login(email, password);
            navigate('/');
        } catch(e: any) {
            console.log(e);
        }
    };
    
    return (
        <>
            <Typography component="h1" variant="h5">Login</Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} noValidate>
                { error && <Typography sx={{color: 'error.main'}}><b>Error:</b> {error}</Typography>}

                <TextField name="email" label="Email Address" autoComplete="email" margin="normal" onChange={e => setEmail(e.target.value)} autoFocus required fullWidth />
                <TextField type="password" name="password" label="Password" autoComplete="current-password" margin="normal" onChange={e => setPassword(e.target.value)} required fullWidth />
                
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>
                
                <Button type="submit" disabled={isLoading} variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
                    Sign In
                </Button>
                
                <Grid container justifyContent='center'>
                    <Grid item>
                        <Typography variant="body2">
                            <Link to="signup">Don't have an account? Sign Up</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Login;