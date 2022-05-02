import {MouseEventHandler, useState} from "react";
import { Link, useNavigate } from 'react-router-dom'

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import useSignUp from '../../hooks/auth/use-signup';
import useLogin from "../../hooks/auth/use-login";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const navigate = useNavigate();
    
    const [signup, isLoading, error] = useSignUp()
    const [login, isLoadingLogin, loginError] = useLogin()

    const submit: MouseEventHandler = async (event) => {
        await signup(email, password, firstName, lastName);
        await login(email, password);
        navigate('/auth/interests');
    }

    return (
        <>
            <Typography component="h1" variant="h5">Sign Up</Typography>

            <Box component="form" noValidate sx={{ mt: 3 }}>
                { (error || loginError) && <Typography sx={{color: 'error.main'}}><b>Error:</b> {error || loginError}</Typography>}

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField name="firstName" label="First Name" autoComplete="given-name" autoFocus required fullWidth onChange={e => setFirstName(e.target.value)} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField name="lastName" label="Last Name" autoComplete="family-name" required fullWidth onChange={e => setLastName(e.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField name="email" label="Email Address" autoComplete="email" required fullWidth onChange={e => setEmail(e.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField type="password" name="password" label="Password" autoComplete="new-password" required fullWidth onChange={e => setPassword(e.target.value)} />
                    </Grid>
                </Grid>

                <Button disabled={isLoading || isLoadingLogin} variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth onClick={submit}>
                    Sign Up
                </Button>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Typography variant="body2">
                            <Link to="/auth">{"Already have an account? Sign in"}</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default SignUp;