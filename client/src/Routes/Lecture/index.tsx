import { useNavigate, useParams } from 'react-router-dom';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { FacebookShareButton, FacebookIcon } from 'react-share';

import { Row } from '../../theme/layout';
import { LectureDetails } from "../../components/LectureDetails";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Lecture } from '../../../../common/types';

const LecturePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lecture, setLecture] = useState<Lecture | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setIsLoading(true);

        axios.get<Lecture>(`/api/lectures/${id}`)
          .then(({ data }) => {
            setLecture(data)
            setIsLoading(false);
          })
      }, []
    );

    const subscribeButton = <Button variant='contained' color='secondary' onClick={() => navigate(`subscribe`)}>Subscribe
      Now</Button>;
    const author = lecture && `${lecture.lecturer.firstName} ${lecture.lecturer.lastName}`;
    const facebookQuote = `check out "${lecture?.name}" lecture by ${author}`;

    if (isLoading) {
      return <CircularProgress />
    }

    return lecture ?
      <Stack spacing={1}>
        <Row justifyContent={'end'}>
          <FacebookShareButton url={window.location.href} quote={facebookQuote}>
            <Row>
              <FacebookIcon size={24} round />
              <Typography>Share</Typography>
            </Row>
          </FacebookShareButton>
        </Row>
        <Typography variant='h4'>{lecture.name}</Typography>
        <Typography variant='h6' onClick={() => navigate(`../../lecturer/${lecture.lecturer._id}`)}
                    sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
          {author}
        </Typography>
        <LectureDetails lecture={lecture} action={subscribeButton} />
      </Stack> :
      <Typography variant='h5'>Sorry, lecture not found...</Typography>
  }
;


export default LecturePage;