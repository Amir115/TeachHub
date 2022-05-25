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

  const { data: user, loading: loadingProfile } = useFetch<PersonViewModel>("auth/me");
  const { data: interests, loading: loadingInterests } = useFetch<[InterestViewModel]>("interests");

  const onClose = () => setIsOpen(false);

  return (
    <> {
      loadingInterests || loadingProfile || !user || !interests
      ? <CircularProgress />
      :<Column>
        <Row sx={{alignItems: 'flex-start'}}>
          <Typography variant='h5'>Interests</Typography>
          <IconButton onClick={() => setIsOpen(true)}>
            <EditIcon/>
          </IconButton>
        </Row>
        <Grid container spacing={1}>
          {user.interests.map((x, i) =>
            <Grid item key={i}>
              <Chip label={`${x.name} ${x.level}`} color='secondary'/>
            </Grid>)}
        </Grid>
        <Dialog open={isOpen} onClose={onClose} maxWidth='md' fullWidth>
            <DialogContent>
              <Column >
                <Typography variant='h4'>Choose your interest:</Typography>
                {/* TODO: Set submit function */}
                <InterestsSelection interests={interests} myInterests={user.interests} submitButtonTitle="Save" onSubmit={() => {}}/>
              </Column>
            </DialogContent>
          </Dialog>
      </Column>
    }
    </>
  )
};