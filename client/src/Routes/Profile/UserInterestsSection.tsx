import {Chip, CircularProgress, Dialog, DialogContent, Grid, IconButton, Typography} from '@mui/material';
import {Column, Row} from '../../theme/layout';
import EditIcon from '@mui/icons-material/Edit';
import {useState} from "react";
import {InterestsSelection} from "../Interests/InterestSelection";
import useFetch from '../../hooks/use-fetch';
import { PersonViewModel } from '../../../../common/types/person';
import { InterestViewModel } from '../../../../common/types/interest';


export const UserInterestsSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: { interests: myInterests }, loading: loadingProfile } = useFetch<PersonViewModel>("user/me");
  const { data: interests, loading: loadingInterests } = useFetch<[InterestViewModel]>("interests");

  const onClose = () => setIsOpen(false);

  return (
    <> {
      loadingInterests || loadingProfile 
      ? <CircularProgress />
      :<Column>
        <Row sx={{alignItems: 'flex-start'}}>
          <Typography variant='h5'>Interests</Typography>
          <IconButton onClick={() => setIsOpen(true)}>
            <EditIcon/>
          </IconButton>
        </Row>
        <Grid container spacing={1}>
          {myInterests?.map((x, i) =>
            <Grid item key={i}>
              <Chip label={`${x.name} ${x.level}`} color='secondary'/>
            </Grid>)}
        </Grid>
        <Dialog open={isOpen} onClose={onClose} maxWidth='md' fullWidth>
            <DialogContent>
              <Column >
                <Typography variant='h4'>Choose your interest:</Typography>
                <InterestsSelection interests={interests} myInterests={myInterests}/>
              </Column>
            </DialogContent>
          </Dialog>
      </Column>
    }
    </>
  )
};