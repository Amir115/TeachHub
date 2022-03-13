import moment from 'moment'
import { useParams } from 'react-router-dom';
import { Row } from '../../theme/layout';
import { Button, Card, CardContent, CardHeader, Chip, Stack, Typography } from '@mui/material';

const Lecture = () => {
  const id = useParams();

  // TODO: fetch lecture
  const lecture = {
    id: 1,
    name: 'History Of Sushi',
    topic: 'sushi',
    lecturer: { id: 2, name: 'Tal Mikey' },
    information: 'Sushi (すし, 寿司, 鮨, 鮓, pronounced [sɯɕiꜜ] or [sɯꜜɕi]) is a traditional Japanese dish of prepared vinegared rice (鮨飯, sushi-meshi), usually with some sugar and salt, accompanied by a variety of ingredients (ねた, neta), such as seafood, often raw, and vegetables. Styles of sushi and its presentation vary widely, but the one key ingredient is "sushi rice", also referred to as shari (しゃり), or sumeshi (酢飯).[1]',
    date: new Date(),
    duration: '1h',
    cost: '40$',
  }

  return <Stack spacing={1}>
    <Typography variant='h4'>{lecture.name}</Typography>
    <Typography variant='subtitle1'>{lecture.lecturer.name}</Typography>
    <Card sx={{ p: 2 }}>
      <Row sx={{ justifyContent: 'space-between' }}>
        <CardHeader title={`${moment(lecture.date).format('DD MMM yyyy | HH:mm')} | ${lecture.duration}`} />
        <Chip label={lecture.cost} color='secondary' />
      </Row>
      <CardContent>
        <Typography variant='body1'>{lecture.information}</Typography>
      </CardContent>
      <Row sx={{justifyContent: 'flex-end'}}>
        <Button variant='contained' color='secondary'>Subscribe Now</Button>
      </Row>
    </Card>
  </Stack>
}

export default Lecture;