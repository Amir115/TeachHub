import useAuth from '../../hooks/auth/use-auth';
import { CenteredColumn, Column, Row } from '../../theme/layout';
import {
  Avatar,
  Button,
  Card,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {UserInterestsSection} from "./UserInterestsSection";
import interests from "../../server-mocks/interests";
import {useState} from "react";

const Profile = () => {
  const session = useAuth(); // Change that to get user from server with his photo and etc..
  const navigate = useNavigate();

  // TODO: use real user data
  const [userInterests, setUserInterests] = useState([interests[0], interests[1]]);
  const [userKnowledge, setUserKnowledge] = useState([interests[3], interests[5]]);

  return <Grid container spacing={1} p={1} justifyContent='space-between' height='100%'>
    <Stack>
      <Typography variant='h4'>My profile</Typography>
      <Typography variant='h4'>{session?.username}</Typography>
      <Stack direction='row' spacing={2} my={2}>
        <Column sx={{flex:1}}>
          <Typography variant='h5'>About me:</Typography>
          <Card sx={{ minWidth: 360, height: 160, backgroundColor: '#3f3f3f' }} />
          <UserInterestsSection interests={userInterests} title='Intrests' onEdit={setUserInterests}/>
        </Column>
        <Column sx={{flex: 1}}>
          <Typography variant='h5'>My education:</Typography>
          <Card sx={{ minWidth: 420, height: 160, backgroundColor: '#3f3f3f' }} />
          <UserInterestsSection interests={userKnowledge} title='Knowledge' onEdit={setUserKnowledge} />
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
}

export default Profile;