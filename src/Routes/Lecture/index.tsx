import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom';
import {Column, Row} from '../../theme/layout';
import { Button, Card, CardContent, CardHeader, Chip, Stack, Typography } from '@mui/material';
import lectures from "../../server-mocks/lectures";
import React from "react";
import {LectureDetails} from "../../components/LectureDetails";

const Lecture = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  // TODO: fetch from server
  const lecture = lectures.find(x => x.id.toString() === id);

  const subscribeButton = <Button variant='contained' color='secondary' onClick={() => navigate(`subscribe`)}>Subscribe Now</Button>;

  return lecture ?
      <Stack spacing={1}>
        <Typography variant='h4'>{lecture.name}</Typography>
        <Typography variant='h6' sx={{textDecoration: 'underline'}}>{`${lecture.lecturer.firstName} ${lecture.lecturer.lastName}`}</Typography>
        <LectureDetails lecture={lecture} action={subscribeButton} />
      </Stack> :
      <Typography variant='h5'>Sorry, lecture not found...</Typography>
};

export default Lecture;