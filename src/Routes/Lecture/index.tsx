import moment from 'moment'
import { useParams } from 'react-router-dom';
import {Column, Row} from '../../theme/layout';
import { Button, Card, CardContent, CardHeader, Chip, Stack, Typography } from '@mui/material';
import lectures from "../../server-mocks/lectures";
import CardMedia from "@mui/material/CardMedia";
import TimerIcon from '@mui/icons-material/Timer';
import React from "react";

const Lecture = () => {
  const {id} = useParams();

  // TODO: fetch from server
  const lecture = lectures.find(x => x.id.toString() === id);

  return <Stack spacing={1}>
    <Typography variant='h4'>{lecture.name}</Typography>
    <Typography variant='subtitle1'>{`${lecture.lecturer.firstName} ${lecture.lecturer.lastName}`}</Typography>
    <Card sx={{ p: 2 }}>
      <Row >
        <Column flex={1} sx={{overflow: 'hidden'}}>
          <img src="/static/images/lecture.jpg" />
        </Column>
        <Column flex={3}>
          <Row sx={{ justifyContent: 'space-between' }}>
            <CardHeader title={`${moment(lecture.date).format('DD MMM yyyy | HH:mm')} | ${lecture.duration}`} />
            <Chip label={`${lecture.cost}$`} color='secondary'
                  sx={{borderRadius: 0, position: 'relative', right: '-16px', fontSize: 16, fontWeight: 'bold'}}/>
          </Row>
          <CardContent sx={{flex:1}}>
            <Typography variant='body1'>{lecture.information}</Typography>
          </CardContent>
          <Row sx={{justifyContent: 'flex-end'}}>
            <Button variant='contained' color='secondary'>Subscribe Now</Button>
          </Row>
        </Column>
      </Row>
    </Card>
  </Stack>
}

export default Lecture;