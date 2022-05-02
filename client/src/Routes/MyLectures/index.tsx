import { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { Lecture } from '../../../../common/types';
import { LectureCard } from './LectureCard';
import { Row } from '../../theme/layout';
import NewLectureDialog from './NewLectureDialog';
import useLocalStorage from '../../hooks/use-local-storage';


const MyLectures = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [isNewLectureDialogOpen, setIsNewLectureDialogOpen] = useState(false);
  const [myLectures, setMyLectures] = useLocalStorage('my-lectures');

  useEffect(() => {
    // TODO: replace with real server request
    setTimeout(() => {
      if (myLectures) {
        setLectures(JSON.parse(myLectures));
      }
    }, 300);
  }, [myLectures]);

  return (
    <Grid container spacing={1} p={1} justifyContent={'space-between'} height={'100%'}>
      <Row sx={{ width: '100%' }} justifyContent={'space-between'}>
        <Typography variant='h4'>{'Your Future Lectures:'}</Typography>
      </Row>
      <Grid container spacing={2} sx={{ paddingY: 4, width: '100%' }}>
        {lectures?.map(lecture => (
          <Grid key={lecture.id} item xs={3}>
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
                        onClose={() => setIsNewLectureDialogOpen(false)}
                        setLectures={setMyLectures} />
    </Grid>
  )
}

export default MyLectures;