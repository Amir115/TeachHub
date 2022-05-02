import { Button, Dialog, DialogContent, FormControl, Input, InputAdornment, Stack, TextField } from '@mui/material';
import { Alarm } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getMyLectures} from '../../../server-mocks/utils';
import { Lecture, Person } from '../../../../../common/types';
import useAuth from '../../../hooks/auth/use-auth';
import lecturers from '../../../server-mocks/lecturers';
import lectures from '../../../server-mocks/lectures';

type Inputs = {
  subject: string,
  description: string,
  date: Date,
  price: number,
  duration: number
};

interface NewLectureDialogProps {
  open: boolean,
  onClose: () => void,
  setLectures: (lectures: string) => void,
}

const NewLectureDialog = ({ open, onClose, setLectures }: NewLectureDialogProps) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const session = useAuth();

  const onSubmit: SubmitHandler<Inputs> = data => {
    const newLecture: Lecture = {...data,
      id: (getMyLectures().length + lectures.length + 1).toString(),
      lecturer: lecturers.find(({id}) => session?.userId) as Person,
      cost: data.price,
      name: data.subject,
      image: '/static/images/lecture1.jpg',
      information: data.description,
      participants: 0,
      topic: 'history',
      tags: ['baking']
    };

    setLectures(JSON.stringify([...getMyLectures(), newLecture]));
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Input placeholder={'subject'} {...register("subject")} />
            <TextField placeholder={'Describe what you want to talk about…'}
                       multiline
                       sx={{ maxHeight: 180, overflow: 'auto' }}
                       {...register("description", { required: true })}

            />
            <Stack direction='row' spacing={2}>
              <Input type={'date'} {...register("date")}/>
              <Input placeholder={'Duration'} type={'number'} {...register("duration")} endAdornment={
                <InputAdornment position="start">
                  <Alarm />
                </InputAdornment>
              } />
              <Input placeholder={'Price'} type={'number'} {...register("price")} endAdornment={
                <InputAdornment position="start">
                  $
                </InputAdornment>
              }/>
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