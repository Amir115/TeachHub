import {useEffect, useState, useRef} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Webcam from "react-webcam";
import Draggable from 'react-draggable';
import {Button, Card, Typography, Box} from '@mui/material';

import {Column, Row} from '../../theme/layout';

import lectures from "../../server-mocks/lectures";
import {subscribedLecturesIds} from "../../server-mocks/utils";
import {LecturePreview} from "../../types";
import useAuth from "../../hooks/auth/use-auth";
import useCameraStream from './use-camera-stream'

const WatchLecture = () => {
  const {id} = useParams();
  const session = useAuth()
  const navigate = useNavigate();

  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [userStreamsBlobUrls, setUserStreamsBlobUrls] = useState<Record<string, string | undefined>>({})
  
  const [startCapturing, usersMediaSources] = useCameraStream(cameraStream, `/watch/${id}`)

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

  useEffect(() => startCapturing(), [startCapturing])

  useEffect(() => {
    const activeSockets = Object.keys(usersMediaSources);
    const newBlobUrls = {...userStreamsBlobUrls}

    activeSockets.forEach(userSocketId => {
      const userMediaSource = usersMediaSources[userSocketId].mediaSource;
      if (!newBlobUrls[userSocketId]) {
        newBlobUrls[userSocketId] = window.URL.createObjectURL(userMediaSource)
      }
    });

    Object.keys(newBlobUrls).forEach(userSocketId => {
      if (!activeSockets.includes(userSocketId)) {
        delete newBlobUrls[userSocketId]
      }
    })

    setUserStreamsBlobUrls(newBlobUrls);
  }, [usersMediaSources]);

  const lecturerSocketId = Object.keys(usersMediaSources)
      .find(userSocketId => usersMediaSources[userSocketId].userId === lecture?.lecturer.id)
  
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
        <video autoPlay src={userStreamsBlobUrls[lecturerSocketId || '']} style={{width: '100%', height: '100%'}} />
      </Column>
      
      <Draggable bounds='parent'>
        <Row sx={{height: 200, width: 200, position: 'absolute', color: 'primary.main', zIndex: 100, bottom: 0, right: 0}}>
          <Card raised sx={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Webcam audio={true} style={{width: '100%', height: '100%'}} onUserMedia={stream => setCameraStream(stream)} />
          </Card>
        </Row>
      </Draggable>

      <Column sx={{position: 'absolute', zIndex: 100, bottom: 0, left: 0}}>
        {
          Object.keys(userStreamsBlobUrls).filter(x => x !== lecturerSocketId).map(userSocketId => (
            <Box key={userSocketId} sx={{mb: 2}}>
              <Draggable bounds='parent'>
                <Card raised sx={{height: 200, width: 200, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <video autoPlay src={userStreamsBlobUrls[userSocketId]} style={{width: '100%', height: '100%'}} />
                </Card>
              </Draggable>
            </Box>
          ))
        }
      </Column>
    </Row>
    </Column>
     : <></>
};


export default WatchLecture;