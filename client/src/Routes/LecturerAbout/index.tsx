import { useParams } from 'react-router-dom';
import personsMock from '../../server-mocks/lecturers'
import { Row } from '../../theme/layout';
import { Avatar, Box, Card, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import moment from 'moment';

const LecturerAbout = () => {
  const { id } = useParams();

  const lecturer = personsMock.find(({ id: personId }) => personId === id)

  return lecturer ? <Stack spacing={2} alignItems='center'>
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
            {lecturer.knowledges.map(({name, level}, index) => (
              <Chip key={index} label={`${name}  ${level}`} color='secondary' sx={{ width: 120 }}/>
            ))}
          </Stack>
        </Stack>
      </Row>
    </Card>
  </Stack> : <CircularProgress />;
}

export default LecturerAbout;