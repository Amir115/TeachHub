import {Chip, Dialog, DialogContent, Grid, IconButton, Typography} from '@mui/material';
import {Column, Row} from '../../theme/layout';
import EditIcon from '@mui/icons-material/Edit';
import {Interest} from "../../../../common/types";
import {useState} from "react";
import {InterestsSelection} from "../Interests/InterestSelection";

interface InterestsSectionProps {
  title: string,
  interests: Interest[],
  onEdit: (chosenInterests: Interest[]) => void
}

export const UserInterestsSection = ({interests, title, onEdit}: InterestsSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const onSubmit = (selectedInterests: Interest[]) => {
    onEdit(selectedInterests);
    onClose();
  }

  return (<Column>
    <Row sx={{alignItems: 'flex-start'}}>
      <Typography variant='h5'>{title}</Typography>
      <IconButton onClick={() => setIsOpen(true)}>
        <EditIcon/>
      </IconButton>
    </Row>
    <Grid container spacing={1}>
      {interests.map((x, i) =>
        <Grid item key={i}>
          <Chip label={x.name} color='secondary'/>
        </Grid>)}
    </Grid>
    <Dialog open={isOpen} onClose={onClose} maxWidth='md' fullWidth>
            <DialogContent>
              <Column >
                <Typography variant='h4'> {`Choose your ${title}:`} </Typography>
                <InterestsSelection submitButtonTitle={'OK'} onSubmit={onSubmit} defaultInterests={interests}/>
              </Column>
            </DialogContent>
          </Dialog>
  </Column>)
};