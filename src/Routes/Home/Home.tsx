import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";

import {CenteredColumn, Column, Row} from "../../theme/layout";
import {LecturePreview} from "../../types";
import {LectureCard} from "../../components/LectureCard";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import lecturesMock from "../../server-mocks/lectures";
import {Box, Button, CircularProgress, IconButton, Typography} from "@mui/material";
import {LectureDetails} from "../../components/LectureDetails";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const [lectures, setLectures] = useState<LecturePreview[]>([] as LecturePreview[]);
  const [subscribedLectures, setSubscribedLectures] = useState<LecturePreview[]>([] as LecturePreview[]);
  const navigate = useNavigate();

  // TODO: fetch from server
  const subscribedLecturesIds = JSON.parse(localStorage.getItem('lectures')) || [];

  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);

  const enterLectureButton = <Button variant='contained' color='secondary'
                                     onClick={() => navigate(`watch/${subscribedLectures[currentLectureIndex].id}`)}>Enter
    Lecture</Button>;

  const onNextClick = () => {
    if (currentLectureIndex < subscribedLectures.length - 1) {
      setCurrentLectureIndex(currentLectureIndex + 1);
    }
  };

  const onBackClick = () => {
    if (currentLectureIndex > 0) {
      setCurrentLectureIndex(currentLectureIndex - 1);
    }
  };

  useEffect(() => {
    // TODO: replace with real server request
    setTimeout(() => {
      setLectures(lecturesMock);
      setSubscribedLectures(subscribedLecturesIds.map(id => lecturesMock.find(x => x.id.toString() === id)));
      setCurrentLectureIndex(0);
    }, 300);
  }, []);

  return (
    <Column sx={{flex: 1}}>
      {
        !!subscribedLectures.length &&
        <Row>
          <Column>
            <Typography variant='h4'>
              Don't Forget
            </Typography>
            <Row sx={{paddingY: 4}}>
              <Box display='flex' alignItems='center' flex={1} justifyContent='center'>
                <IconButton onClick={onBackClick} disabled={currentLectureIndex <= 0}>
                  <ArrowBackIosNewIcon/>
                </IconButton>
              </Box>
              <Row sx={{flex: 3}}>
                <LectureDetails lecture={subscribedLectures[currentLectureIndex]} action={enterLectureButton}/>
              </Row>
              <Box display='flex' alignItems='center' flex={1} justifyContent='center'>
                <IconButton onClick={onNextClick} disabled={currentLectureIndex >= subscribedLectures.length - 1}>
                  <ArrowForwardIosIcon/>
                </IconButton>
              </Box>
            </Row>
          </Column>
        </Row>
      }
      {
        !!lectures.length ?
          <Row>
            <Column>
              <Typography variant='h4'>
                You might like
              </Typography>
              <Grid container spacing={2} sx={{paddingY: 4}}>
                {lectures?.map((lecture) => (
                  <Grid key={lecture.id} item xs={3}>
                    <LectureCard lecture={lecture}/>
                  </Grid>
                ))}
              </Grid>
            </Column>
          </Row> :
          <CircularProgress />
      }
    </Column>
  );
};

export default Home;
