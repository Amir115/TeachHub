import { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { Lecture } from '../../../../common/types';
import { LectureCard } from './LectureCard';
import { Row } from '../../theme/layout';
import NewLectureDialog from './NewLectureDialog';
import axios from 'axios';
import useAuth from '../../hooks/auth/use-auth';

const MyLectures = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [isNewLectureDialogOpen, setIsNewLectureDialogOpen] = useState(false);
  const session = useAuth();

  useEffect(() => {
    axios.get<Lecture[]>('/api/lectures')
      .then(({ data }) => {
        setLectures(data.filter(({lecturer}) => lecturer.id === session?.id));
      })
  }, []);

  return (
    <Grid container spacing={1} p={1} justifyContent={'space-between'} height={'100%'}>
      <Row sx={{ width: '100%' }} justifyContent={'space-between'}>
        <Typography variant='h4'>{'Your Future Lectures:'}</Typography>
      </Row>
      <Grid container spacing={2} sx={{ paddingY: 4, width: '100%' }}>
        {lectures?.map(lecture => (
          <Grid key={lecture._id} item xs={3}>
            <LectureCard lecture={lecture} />
          </Grid>
        ))}
      </Grid>
      <Button
        sx={{ position: 'fixed', bottom: '20px', right: '20px' }}
                endIcon={<AddIcon />}
        variant={'contained'}
        color={'secondary'}
        onClick={() => setIsNewLectureDialogOpen(true)}
      >
        {'New Lecture'}
      </Button>
      <NewLectureDialog open={isNewLectureDialogOpen}
                        onClose={() => setIsNewLectureDialogOpen(false)} />
    </Grid>
  )
}

export default MyLectures;