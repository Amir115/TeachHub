import moment from 'moment'
import {Column, Row} from '../theme/layout';
import {Card, CardContent, CardHeader, CardMedia, Chip, Typography} from '@mui/material';
import React, {FC} from "react";
import {LecturePreview} from "../types";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface LectureDetailsProps {
  lecture: LecturePreview;
  action: ReactJSXElement
}

export const LectureDetails: FC<LectureDetailsProps> = ({lecture, action}) => {
  return <Card sx={{p: 2, backgroundColor: 'primary.main', color: 'white'}}>
    <Row>
      <Column flex={1} sx={{overflow: 'hidden'}}>
        <CardMedia component='img' image="/static/images/lecture.jpg" sx={{borderRadius: 2}}/>
      </Column>
      <Column flex={3}>
        <Row sx={{justifyContent: 'space-between'}}>
          <CardHeader title={`${moment(lecture.date).format('DD MMM yyyy | HH:mm')} | ${lecture.duration}`}/>
          <Chip label={`${lecture.cost}$`} color='secondary'
                sx={{borderRadius: 0, position: 'relative', right: '-16px', fontSize: 16, fontWeight: 'bold', borderRadius: 1}}/>
        </Row>
        <CardContent sx={{flex: 1}}>
          <Typography variant='body1'>{lecture.information}</Typography>
        </CardContent>
        <Row sx={{justifyContent: 'flex-end'}}>
          {
            action
          }
        </Row>
      </Column>
    </Row>
  </Card>
};