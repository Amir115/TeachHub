import { Avatar, Button, Card, Grid, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
;
import useAuth from "../../hooks/auth/use-auth";
import { CenteredColumn, Column } from "../../theme/layout";
import {UserInterestsSection} from "./UserInterestsSection";

const Profile = () => {
  const session = useAuth(); // Change that to get user from server with his photo and etc..
  const navigate = useNavigate();

  return (
    <Grid container spacing={1} p={1} justifyContent='space-between' height='100%'>
      <Stack>
        <Typography variant='h4'>My profile</Typography>
        <Typography variant='h4'>{session?.username}</Typography>
        <Stack direction='row' spacing={2} my={2}>
          <Column sx={{flex:1}}>
            <Typography variant='h5'>my knowledge:</Typography>
            <Card sx={{ minWidth: 360, height: 160, backgroundColor: '#3f3f3f' }} />
            <UserInterestsSection />
          </Column>
        </Stack>
      </Stack>
      <Column sx={{ justifyContent: 'space-between', height: '100%'}}>
        <Card sx={{ minWidth: 180, height: '40%' }}>
          <CenteredColumn sx={{ height: '100%' }}>
            <Avatar variant='square' />
          </CenteredColumn>
        </Card>
        <Button variant='contained' color='secondary' onClick={() => navigate('../my-lectures')}>My lectures</Button>
      </Column>
    </Grid>
  );  
}

export default Profile;
