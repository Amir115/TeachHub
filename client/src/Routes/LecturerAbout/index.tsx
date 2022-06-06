import { useParams } from 'react-router-dom';
// @ts-ignore
import ReactStars from "react-rating-stars-component";

import { Row } from '../../theme/layout';
import { Avatar, Box, Card, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import moment from 'moment';
import useFetch from '../../hooks/use-fetch';
import {Person} from "../../../../common/types";
import React from "react";

interface UserRating {
  rating: number
}

const LecturerAbout = () => {
  const { id } = useParams();
  const {data: lecturer, loading} = useFetch<Person>(`user/${id}`)
  const {data: userRating, loading: loadingRating} = useFetch<UserRating>(`user/${id}/rating`)

  return (!loading && lecturer) ? <Stack spacing={2} alignItems='center'>
    <Typography variant='h2'>About The Lecturer</Typography>
    <Card sx={{ p: 1, width: '80%' }}>
      <Row>
        <Stack spacing={1} mx={2}>
          <Box height={150} width={150}>
            <Avatar sx={{ height: '100%', width: '100%' }} />
          </Box>
          <Stack spacing={1}>
            <Typography variant='h6'>{moment(lecturer.birthDate).format('DD MMM yyyy')}</Typography>
            <Typography variant='h6'>{lecturer.education}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Row>
            <Typography sx={{ mx: '4px' }} variant='h4'>{lecturer.firstName}</Typography>
            <Typography variant='h4'>{lecturer.lastName}</Typography>
          </Row>
          <Typography variant='h6'>{lecturer.aboutInformation}</Typography>
          <Stack spacing={1}>
            <Typography variant='h4'>Knowledge:</Typography>
            {lecturer.interests.map(({name}, index) => (
              <Chip key={index} label={`${name}`} color='secondary' sx={{ width: 120 }}/>
            ))}
          </Stack>
        </Stack>
        {!loadingRating &&
        <ReactStars
          count={5}
          size={24}
          value={userRating?.rating}
          activeColor="#ffd700"
          edit={false}
        />}
      </Row>
    </Card>
  </Stack> : <CircularProgress />;
}

export default LecturerAbout;