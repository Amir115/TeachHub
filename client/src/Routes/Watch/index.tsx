import {useEffect, useState, useRef} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Webcam from "react-webcam";
import Draggable from 'react-draggable';

import {Card, Typography, Box, TextField, Button} from '@mui/material';
import {Column, Row} from '../../theme/layout';

import useAuth from "../../hooks/auth/use-auth";
import useCameraStream from './use-camera-stream'
import useWatchSocket from './use-watch-socket';
import Comments from "./Comments/Comments";
import useFetch from '../../hooks/use-fetch';
import { LectureViewModel } from "../../../../common/types/lecture/lecture";

const WatchLecture = () => {
  const {id} = useParams();
  const user = useAuth()
  const navigate = useNavigate();

  const {data: lecture, loading: isLoadingLecture} = useFetch<LectureViewModel>(`lectures/${id}`)
  const {data: subscribedLectures, loading: isLoadingSubscribedLectures} = useFetch<string[]>(`user/lectures`)

  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [userStreamsBlobUrls, setUserStreamsBlobUrls] = useState<Record<string, string | undefined>>({})
  
  const socket = useWatchSocket(`/watch/${id}`)
  const [startCapturing, usersMediaSources] = useCameraStream(socket, cameraStream)

  const createMediaSourcesSnapshot = (): Partial<Record<string, MediaSource>> => 
    Object.keys(usersMediaSources).reduce((all, key) => ({...all, [key]: usersMediaSources[key]?.mediaSource}), {})

  const usersMediaSourcesSnapshot = useRef(createMediaSourcesSnapshot())

  const findUserSocket = (userId: string) => Object.keys(usersMediaSources)
    .find(userSocketId => lecture && usersMediaSources[userSocketId]?.userId === userId)

  useEffect(() => {
    if (isLoadingLecture || isLoadingSubscribedLectures) return;

    if(!lecture || !id || !subscribedLectures?.includes(id)) {
      navigate('/');
    }
  }, [isLoadingLecture, isLoadingSubscribedLectures]);

  useEffect(() => {
    if (cameraStream) {
      return startCapturing();
    }
  }, [cameraStream])

  useEffect(() => {
    const activeSockets = Object.keys(usersMediaSources);
    const newBlobUrls = {...userStreamsBlobUrls}

    activeSockets.forEach(userSocketId => {
      const userMediaSource = usersMediaSources[userSocketId]?.mediaSource;
      if (!userMediaSource) return;

      const userMediaSourceSnapshot = usersMediaSourcesSnapshot.current[userSocketId]

      if (!newBlobUrls[userSocketId] || userMediaSource !== userMediaSourceSnapshot) {
        newBlobUrls[userSocketId] = window.URL.createObjectURL(userMediaSource)
      }
    });

    Object.keys(newBlobUrls).forEach(userSocketId => {
      if (!activeSockets.includes(userSocketId)) {
        delete newBlobUrls[userSocketId]
      }
    })

    setUserStreamsBlobUrls(newBlobUrls);
    usersMediaSourcesSnapshot.current = createMediaSourcesSnapshot();
  }, [usersMediaSources]);

  const lecturerSocketId = lecture && findUserSocket(lecture.lecturer.id)
  const mySocketId = findUserSocket(user?.id || '')

  // const toggleLevel = () => axiosClient.put('/lecture/:id/level', lecture.id);
  
  return lecture ? <Column sx={{flex:1, maxHeight: 1}}>
      <Row sx={{alignItems: 'baseline', mb: 2}}>
        <Row sx={{flex: 1, alignItems: 'baseline'}}>
          <Typography variant='h4' sx={{fontWeight: 800}}>{lecture.name}</Typography>
          <Typography variant='h5' sx={{fontWeight: 600, marginLeft: 1, alignSelf: 'center'}}> | </Typography>
          <Typography variant='h6' sx={{fontWeight: 600, marginLeft: 1}}>
            {`${lecture.lecturer.firstName} ${lecture.lecturer.lastName}`}
          </Typography>
          {/* <Button onClick={toggleLevel}>
            <Typography>{lecture.level}</Typography>
            { lecture.rated 
              ? <StarIcon/>
              : <StarBorderIcon/>
            }
          </Button> */}
        </Row>
        <Column>
          <Typography variant='h5' sx={{fontWeight: 800}}>00:00:00</Typography>
        </Column>
      </Row>
    <Row sx={{flex: 1, maxHeight: 1, position: 'relative'}}>
      <Comments socket={socket} />

      <Box sx={{ml: 2, flex: 1, position: 'relative'}}>
        {
            lecturerSocketId !== mySocketId
            ? <video autoPlay src={userStreamsBlobUrls[lecturerSocketId || '']} style={{position: 'absolute', width: '100%', height: '100%'}} />
            : <Webcam muted audio={true} style={{position: 'absolute', width: '100%', height: '100%'}} onUserMedia={stream => setCameraStream(stream)} />
        }

       <Column sx={{position: 'absolute', zIndex: 100, bottom: 0, left: 0}}>
        {
          Object.keys(userStreamsBlobUrls).filter(x => ![lecturerSocketId, mySocketId].includes(x)).map(userSocketId => (
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
      </Box>
      
      {lecturerSocketId !== mySocketId && <Draggable bounds='parent'>
        <Row sx={{height: 200, width: 200, position: 'absolute', color: 'primary.main', zIndex: 100, bottom: 0, right: 0}}>
          <Card raised sx={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Webcam muted audio={true} style={{width: '100%', height: '100%'}} onUserMedia={stream => setCameraStream(stream)} />
          </Card>
        </Row>
      </Draggable>}
    </Row>
    </Column>
     : <></>
};


export default WatchLecture;