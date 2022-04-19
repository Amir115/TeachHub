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
import ProfileBullets from './ProfileBullets';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const session = useAuth(); // Change that to get user from server with his photo and etc..
  const navigate = useNavigate();
  const intrests = ['Baking', 'Gym', 'Cooking', 'Js'];
  const knowledge = ['Baking', 'Cooking'];

  return <Grid container spacing={1} p={1} justifyContent='space-between' height='100%'>
    <Stack>
      <Typography variant='h4'>My profile</Typography>
      <Typography variant='h4'>{session?.username}</Typography>
      <Stack direction='row' spacing={2} my={2}>
        <Column>
          <Typography variant='h5'>About me:</Typography>
          <Card sx={{ minWidth: 360, height: 160, backgroundColor: '#3f3f3f' }} />
        </Column>
        <Column>
          <Typography variant='h5'>My education:</Typography>
          <Card sx={{ minWidth: 420, height: 160, backgroundColor: '#3f3f3f' }} />
        </Column>
      </Stack>
      <Row sx={{ justifyContent: 'space-around' }}>
        <ProfileBullets bullets={intrests} title='Intrests' />
        <ProfileBullets bullets={knowledge} title='Knowledge' />
      </Row>
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