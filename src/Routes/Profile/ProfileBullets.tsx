import { Chip, Grid, IconButton, Typography } from '@mui/material';
import { Column, Row } from '../../theme/layout';
import EditIcon from '@mui/icons-material/Edit';

interface ProfileBulletsProps {
  bullets: string[],
  title: string
}

const ProfileBullets = ({ bullets, title }: ProfileBulletsProps) => <Column>
  <Row sx={{ alignItems: 'center' }}>
    <Typography variant='h5'>{title}</Typography>
    <IconButton>
      <EditIcon />
    </IconButton>
  </Row>
  <Grid container spacing={1}>
    {bullets.map((x, i) =>
      <Grid item>
        <Chip key={i} label={x} color='secondary' />
      </Grid>)}
  </Grid>
</Column>

export default ProfileBullets;