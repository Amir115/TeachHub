import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { getMyLecturesIds } from '../../server-mocks/utils';
import lecturesMock from '../../server-mocks/lectures';
import { LecturePreview } from '../../types';
import { LectureCard } from './LectureCard';
import { Row } from '../../theme/layout';


const MyLectures = () => {
    const navigate = useNavigate();
    const [myLectures, setMyLectures] = useState<LecturePreview[]>([]);

    useEffect(() => {
        // TODO: replace with real server request
        setTimeout(() => {
            setMyLectures(getMyLecturesIds().map(id => lecturesMock.find(x => x.id === id)).filter((x): x is LecturePreview => Boolean(x)) || []);
        }, 300);
    }, []);

    return (
        <Grid container spacing={1} p={1} justifyContent={'space-between'} height={'100%'}>
            <Row sx={{ width: '100%' }} justifyContent={'space-between'}>
                <Typography variant='h4'>{'Your Future Lectures:'}</Typography>
            </Row>
            <Grid container spacing={2} sx={{ paddingY: 4, width: '100%' }}>
                {myLectures?.map(lecture => (
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
                onClick={() => navigate('../my-lectures')}
            >
                {'New Lecture'}
            </Button>
        </Grid>
    )
}

export default MyLectures;