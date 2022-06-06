import {Chip, CircularProgress, Dialog, DialogContent, Grid, IconButton, Typography} from '@mui/material';
import {Column, Row} from '../../theme/layout';
import EditIcon from '@mui/icons-material/Edit';
import React, {FC, useState} from "react";
import {InterestsSelection} from "../Interests/InterestSelection";
import useFetch from '../../hooks/use-fetch';
import {apiClient} from "../../utils/axios/axios-client";
import {Interest, Person} from "../../../../common/types";

export const UserInterestsSection: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: user, loading: loadingProfile } = useFetch<Person>("auth/me", [isOpen]);
  const { data: interests, loading: loadingInterests } = useFetch<[Interest]>("interests");

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async (selectedInterests: Interest[]) => {
    await apiClient.instance.put('user/interests', {interests: JSON.stringify(selectedInterests)});
    onClose();
  }

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
              <Chip label={x.name} color='secondary'/>
            </Grid>)}
        </Grid>
        <Dialog open={isOpen} onClose={onClose} maxWidth='md' fullWidth>
            <DialogContent>
              <Column >
                <Typography variant='h4'>Choose your interest:</Typography>
                <InterestsSelection submitButtonTitle={'OK'} onSubmit={onSubmit} defaultInterests={user.interests}/>
              </Column>
            </DialogContent>
          </Dialog>
      </Column>
    }
    </>
  )
};