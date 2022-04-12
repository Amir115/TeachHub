import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import {Box, Button, Card, Typography} from '@mui/material';

import {Column, Row} from '../../theme/layout';

import lectures from "../../server-mocks/lectures";
import {subscribedLecturesIds} from "../../server-mocks/utils";
import {LecturePreview} from "../../types";
import useAuth from "../../hooks/auth/use-auth";
import Webcam from "react-webcam";

const WatchLecture = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const session = useAuth()

  const [lecture, setLecture] = useState<LecturePreview>();
  const isOwner = lecture?.lecturer.id === session?.userId;

  useEffect(() => {
    // TODO: fetch from server
    const currentlecture = lectures.find(x => x.id === id) as LecturePreview;

    setLecture(currentlecture);

    if(!currentlecture || !id || !subscribedLecturesIds.includes(id)) {
      navigate('/');
    }
  }, []);

  const subscribeButton = <Button variant='contained' color='secondary' onClick={() => navigate(`subscribe`)}>Subscribe Now</Button>;

  return lecture ? <Column sx={{flex:1}}>
      <Row sx={{alignItems: 'baseline'}}>
        <Row sx={{flex: 1, alignItems: 'baseline'}}>
          <Typography variant='h4' sx={{fontWeight: 800}}>{lecture.name}</Typography>
          <Typography variant='h5' sx={{fontWeight: 600, marginLeft: 1, alignSelf: 'center'}}> | </Typography>
          <Typography variant='h6' sx={{fontWeight: 600, marginLeft: 1}}>
            {`${lecture.lecturer.firstName} ${lecture.lecturer.lastName}`}
          </Typography>
        </Row>
        <Column>
          <Typography variant='h5' sx={{fontWeight: 800}}>00:00:00</Typography>
        </Column>
      </Row>
    <Row sx={{flex:1, position: 'relative', maxWidth: '100%'}}>
      <Column sx={{flex: 1, height: 700}}>
        <Webcam audio={true} style={{width: '100%', height: '100%'}} />
      </Column>
      
      <Draggable bounds='parent'>
        <Row sx={{height: 200, width: 200, position: 'absolute', color: 'primary.main', zIndex: 100, bottom: 0, right: 0}}>
          <Card raised sx={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {`${lecture.lecturer.firstName} ${lecture.lecturer.lastName}`}
          </Card>
        </Row>
      </Draggable>
    </Row>
    </Column>
     : <></>
};


export default WatchLecture;