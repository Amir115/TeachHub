import {
  Button,
  Dialog,
  DialogContent, IconButton,
  Input,
  InputAdornment, InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../../../hooks/auth/use-auth';
import { useSnackbar } from '../../../providers/SnackbarProvider';
import { Column } from '../../../theme/layout';
import { Tags } from '../../../../../common/types/tags';
import TagsMock from '../../../server-mocks/tags';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Lecture } from '../../../../../common/types';

type Inputs = {
  subject: string,
  description: string,
  date: Date,
  price: number,
  duration: number,
  topic: string,
  tags: Tags[],
  image: FileList
};

interface UpsertLectureDialogProps {
  open: boolean,
  onClose: () => void,
  lecture: Lecture | undefined
}

const PhotoInput = styled('input')({
  display: 'none',
});

const UpsertLectureDialog = ({ open, onClose, lecture }: UpsertLectureDialogProps) => {
  const { watch, register, handleSubmit } = useForm<Inputs>();
  const user = useAuth();
  const { openMessage } = useSnackbar();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const form = new FormData();

      data.image?.[0] && form.append('image', data.image[0]);
      
      const newLecture = {
        ...data,
        lecturer: user,
        cost: data.price,
        name: data.subject,
        information: data.description,
        participants: lecture ? lecture.participants : 0,
        topic: data.topic,
        tags: data.tags
      };
  
      form.append('lecture', JSON.stringify(newLecture));
  
      lecture ? await axios.put(`/api/lectures/${lecture._id}`, form) : await axios.post('/api/lectures/', form);
  
      openMessage(lecture ? 'Lecture updated successfully!' : 'Lecture created successfully!', 'success');
  
      onClose();
    }
    catch (e) {
      openMessage('Cannot save lecture, please try again later', 'error');
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Stack spacing={1} direction={'row'}>
              <Input placeholder={'subject'} value={watch('subject') || lecture?.name} {...register("subject")} fullWidth />
              <Input placeholder={'topic'} value={watch('topic') || lecture?.topic} {...register("topic")} fullWidth />
              <Column>
                <InputLabel>Tags</InputLabel>
                <Select multiple defaultValue={lecture?.tags || []} {...register('tags')} sx={{ width: 400 }}>
                  {TagsMock.map((x, i) => (
                    <MenuItem key={i} value={x}>{x}</MenuItem>
                  ))}
                </Select>
              </Column>
            </Stack>
            <TextField placeholder={'Describe what you want to talk about…'}
              multiline
              sx={{ maxHeight: 180, overflow: 'auto' }}
              value={watch('description') || lecture?.information}
              {...register("description", { required: true })}

            />
            <Stack direction='row' spacing={2}>
              <Input type={'date'} value={(watch('date') || lecture?.date)?.toString().split('T')[0]} {...register("date")} />
              <Input placeholder={'Duration'} type={'number'} value={watch('duration') || lecture?.duration} {...register("duration")} endAdornment={
                <InputAdornment position="start">
                  <AlarmIcon />
                </InputAdornment>
              } />
              <Input placeholder={'Price'} type={'number'} value={watch('price') || lecture?.cost} {...register("price")} endAdornment={
                <InputAdornment position="start">
                  $
                </InputAdornment>
              } />
              <label htmlFor="icon-button-file">
                <PhotoInput accept="image/*" id="icon-button-file" type="file" {...register("image")} />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCameraIcon />
                </IconButton>
              </label>
            </Stack>
            <Stack direction='row' spacing={2}>
              <Button type="submit" variant='contained'>Save</Button>
              <Button variant='outlined' onClick={onClose}>Cancel</Button>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpsertLectureDialog;