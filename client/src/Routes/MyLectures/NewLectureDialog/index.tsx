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
import { Alarm, PhotoCamera } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../../../hooks/auth/use-auth';
import { Column } from '../../../theme/layout';
import { Tags } from '../../../../../common/types/tags';
import TagsMock from '../../../server-mocks/tags';
import { styled } from '@mui/material/styles';
import axios from 'axios';

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

interface NewLectureDialogProps {
  open: boolean,
  onClose: () => void
}

const PhotoInput = styled('input')({
  display: 'none',
});

const NewLectureDialog = ({ open, onClose }: NewLectureDialogProps) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const user = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const form = new FormData();
    form.append('image', data.image[0]);

    const newLecture = {
      ...data,
      lecturer: user,
      cost: data.price,
      name: data.subject,
	      information: data.description,
      participants: 0,
      topic: data.topic,
      tags: data.tags
    };

    form.append('lecture', JSON.stringify(newLecture));

    console.log(form);
    await axios.post('/api/lectures/', form);

    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Stack spacing={1} direction={'row'}>
              <Input placeholder={'subject'} {...register("subject")} fullWidth />
              <Input placeholder={'topic'} {...register("topic")} fullWidth />
              <Column>
                <InputLabel>Tags</InputLabel>
                <Select multiple {...register('tags')} sx={{ width: 400 }} defaultValue={[]}>
                  {TagsMock.map((x, i) => (
                    <MenuItem key={i} value={x}>{x}</MenuItem>
                  ))}
                </Select>
              </Column>
            </Stack>
            <TextField placeholder={'Describe what you want to talk about…'}
                       multiline
                       sx={{ maxHeight: 180, overflow: 'auto' }}
                       {...register("description", { required: true })}

            />
            <Stack direction='row' spacing={2}>
              <Input type={'date'} {...register("date")} />
              <Input placeholder={'Duration'} type={'number'} {...register("duration")} endAdornment={
                <InputAdornment position="start">
                  <Alarm />
                </InputAdornment>
              } />
              <Input placeholder={'Price'} type={'number'} {...register("price")} endAdornment={
                <InputAdornment position="start">
                  $
                </InputAdornment>
              } />
              <label htmlFor="icon-button-file">
                <PhotoInput accept="image/*" id="icon-button-file" type="file" {...register("image")}/>
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
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

export default NewLectureDialog;