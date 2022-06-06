import moment from 'moment'
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import {Column, Row} from '../theme/layout';
import {Card, CardContent, CardHeader, CardMedia, Chip, Typography} from '@mui/material';
import React, {FC} from "react";
import {Lecture} from "../../../common/types";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import Rating from "react-rating";
import {apiClient} from "../utils/axios/axios-client";
import useAuth from "../hooks/auth/use-auth";

interface LectureDetailsProps {
  lecture: Lecture;
  action: ReactJSXElement
}

export const LectureDetails: FC<LectureDetailsProps> = ({lecture, action}) => {
  const user = useAuth();

  // @ts-ignore
  const userLectureRating = lecture.ratings.find(x => x.user === user?._id?.toString())?.rating || 0;

  const onRatingChange = async (rating: number) => {
    await apiClient.instance.put(`lectures/${lecture._id}/rating`, {rating});
  };

  return <Card sx={{p: 2, backgroundColor: 'primary.main', color: 'white', flex:1}}>
    <Row>
      <Column flex={1} sx={{overflow: 'hidden'}}>
        <CardMedia component='img' src={`${window.location.origin}/${lecture.image.url}`} sx={{borderRadius: 2, height: '-webkit-fill-available'}}/>
      </Column>
      <Column flex={3}>
        <Row sx={{justifyContent: 'space-between'}}>
          <CardHeader title={`${moment(lecture.date).format('DD MMM yyyy | HH:mm')} | ${lecture.duration}`}/>
          <ReactStars
            count={5}
            onChange={onRatingChange}
            size={24}
            value={userLectureRating}
            activeColor="#ffd700"
          />
          <Chip label={`${lecture.cost}$`} color='secondary'
                sx={{borderRadius: 0, position: 'relative', right: '-16px', fontSize: 16, fontWeight: 'bold'}}/>
        </Row>
        <CardContent sx={{flex: 1}}>
          <Typography variant='body1'>{lecture.information}</Typography>
        </CardContent>
        <Row sx={{ marginLeft: '15px', justifyContent: 'space-between'}}>
          <Row>
            { lecture.tags.map((x, i) => (<Chip key={i} label={x} color='secondary' sx={{ marginRight: '5px' }} /> )) }
          </Row>
          {
            action
          }
        </Row>
      </Column>
    </Row>
  </Card>
};