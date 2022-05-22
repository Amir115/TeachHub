import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {omit} from 'lodash';
import {SubmitHandler, useForm} from "react-hook-form";

import useLogin from "../../../hooks/auth/use-login";
import useSignUp, {SignUpData} from "../../../hooks/auth/use-signup";

interface SignUpInputs extends SignUpData {
  confirmPassword: string;
}

const SignUp = () => {
  const {register, handleSubmit, watch, formState: {errors}} = useForm<SignUpInputs>();
  const navigate = useNavigate();

  const [signup, isLoading, error] = useSignUp()
  const [login, isLoadingLogin, loginError] = useLogin()

  const onSubmit: SubmitHandler<SignUpInputs> = async data => {
    await signup(omit(data, 'confirmPassword'));
    await login(data.email, data.password);
    navigate('/auth/interests');
  }

  return (
    <>
      <Typography component="h1" variant="h5">Sign Up</Typography>
      <Box component="form" noValidate sx={{mt: 3}} onSubmit={handleSubmit(onSubmit)}>
        { (error || loginError) && <Typography sx={{color: 'error.main'}}><b>Error:</b> {error || loginError}</Typography>}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField {...register('firstName')} label="First Name" autoComplete="given-name" autoFocus required
                       fullWidth/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField {...register('lastName')} label="Last Name" autoComplete="family-name" required fullWidth/>
          </Grid>
          <Grid item xs={12} sm={4}>

            <TextField type='date' label='birth date' InputLabelProps={{shrink: true}}
                       {...register('birthDate', {valueAsDate: true})} required fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <TextField {...register('email')} label="Email Address" autoComplete="email" required fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <TextField type="password" {...register('password')} label="Password" autoComplete="new-password" required
                       fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <TextField type="password" {...register('confirmPassword')} label="ConfirmPassword"
                       autoComplete="new-password" required fullWidth/>
          </Grid>
        </Grid>

        <Grid container justifyContent="center">
          <Button type='submit' variant="contained" sx={{mt: 3, mb: 2}} disabled={isLoading || isLoadingLogin}>
            Sign Up
          </Button>
        </Grid>

        <Grid container justifyContent="center">
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