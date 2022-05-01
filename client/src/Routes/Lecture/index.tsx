import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import { FacebookShareButton, FacebookIcon } from 'react-share';

import {Row} from '../../theme/layout';
import lectures from "../../server-mocks/lectures";
import {LectureDetails} from "../../components/LectureDetails";

const Lecture = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  // TODO: fetch from server
  const lecture = lectures.find(x => x.id === id);

  const subscribeButton = <Button variant='contained' color='secondary' onClick={() => navigate(`subscribe`)}>Subscribe Now</Button>;
  const author = lecture && `${lecture.lecturer.firstName} ${lecture.lecturer.lastName}`;
  const facebookQuote = `check out "${lecture?.name}" lecture by ${author}`;

  return lecture ?
      <Stack spacing={1}>
        <Row justifyContent={'end'}>
          <FacebookShareButton url={window.location.href} quote={facebookQuote}>
            <Row>
              <FacebookIcon size={24} round/>
              <Typography>Share</Typography>
            </Row>
          </FacebookShareButton>
        </Row>
        <Typography variant='h4'>{lecture.name}</Typography>
        <Typography variant='h6' onClick={() => navigate(`../../lecturer/${lecture.lecturer.id}`)} sx={{textDecoration: 'underline', cursor: 'pointer'}}>
          {author}
        </Typography>
        <LectureDetails lecture={lecture} action={subscribeButton} />
      </Stack> :
      <Typography variant='h5'>Sorry, lecture not found...</Typography>
};


export default Lecture;