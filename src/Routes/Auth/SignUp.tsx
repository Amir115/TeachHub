import { Link } from 'react-router-dom'

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const SignUp = () => {
    return (
        <>
            <Typography component="h1" variant="h5">Sign Up</Typography>

            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField name="firstName" label="First Name" autoComplete="given-name" autoFocus required fullWidth />    
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField name="lastName" label="Last Name" autoComplete="family-name" required fullWidth />    
                    </Grid>

                    <Grid item xs={12}>
                        <TextField name="email" label="Email Address" autoComplete="email" required fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField type="password" name="password" label="Password" autoComplete="new-password" required fullWidth />
                    </Grid>
                </Grid>
                
                <Button variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
                    Sign Up
                </Button>
                
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Typography variant="body2">
                            <Link to="/auth">Already have an account? Sign in</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default SignUp;