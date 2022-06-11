import moment from 'moment'
import { Card, CardContent, CardHeader, CardMedia, Chip, Typography } from '@mui/material';

import { Column, Row } from '../theme/layout';
import { Lecture } from "../../../common/types";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

import { apiClient } from "../utils/axios/axios-client";
import useAuth from "../hooks/auth/use-auth";
import Rating from './Rating';
import { FacebookIconButton } from './FacebookIconButton';

interface LectureDetailsProps {
  lecture: Lecture;
  action: ReactJSXElement
}

export const LectureDetails = ({ lecture, action }: LectureDetailsProps) => {
  const user = useAuth();

  // @ts-ignore
  const userLectureRating = lecture.ratings.find(x => x.user === user?._id?.toString())?.rating || 0;

  const onRatingChange = async (rating: number) => {
    await apiClient.instance.put(`lectures/${lecture._id}/rating`, { rating });
  };

  const facebookQuote = `check out "${lecture?.name}" lecture by ${lecture.lecturer.firstName} ${lecture.lecturer.lastName}`;

  return <Card sx={{ p: 2, backgroundColor: 'primary.main', color: 'white', flex: 1, height: '300px' }}>
    <Row>
      <Column flex={1} sx={{ overflow: 'hidden' }}>
        <CardMedia component='img' src={lecture.image.url} sx={{ borderRadius: 2, height: '268px' }} />
      </Column>
      <Column flex={3}>
        <Row sx={{ justifyContent: 'space-between' }}>
          <CardHeader title={`${moment(lecture.date).format('DD MMM yyyy | HH:mm')} | ${lecture.duration}`} />
          <Row sx={{ height: '40px', alignItems: 'center' }}>
            <Rating
              onChange={(_, rating: number | null) => onRatingChange(rating || 0)}
              value={userLectureRating}
            />
            <FacebookIconButton quote={facebookQuote} />
          </Row>
          <Chip label={`${lecture.cost}$`} color='secondary'
            sx={{ borderRadius: 0, position: 'relative', right: '-16px', fontSize: 16, fontWeight: 'bold' }} />
        </Row>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant='body1'>{lecture.information}</Typography>
        </CardContent>
        <Row sx={{ marginLeft: '15px', justifyContent: 'space-between' }}>
          <Row>
            {lecture.tags.map((x, i) => (<Chip key={i} label={x} color='secondary' sx={{ marginRight: '5px' }} />))}
          </Row>
          {
            action
          }
        </Row>
      </Column>
    </Row>
  </Card>
};