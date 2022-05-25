import { Grid, Button } from "@mui/material";

import {Column} from "../../theme/layout";
import {InterestCard} from "./InterestCard";
import { Interest, InterestViewModel } from "../../../../common/types/interest";

interface InterestsSelectionProps {
  myInterests: InterestViewModel[];
  interests: Interest[];
  submitButtonTitle: string;
  onSubmit: (interesets: Interest[]) => void;
}

export const InterestsSelection = ({ interests, myInterests, submitButtonTitle, onSubmit }: InterestsSelectionProps) => {
  return (
    <Column sx={{flex: 1, alignItems: 'center', height: '100%'}}>
      <Grid container spacing={4} sx={{paddingY: 4, overflowY: 'auto'}}>
        {interests?.map((interest) => {
          const my = myInterests.find(x => x.id === interest.id);

          return (
          <Grid key={interest.id} item xs={3}>
            <InterestCard interest={interest} defaultSelected={!!my} isEdit={!!my ? my.level < 1 : true}/>
          </Grid>
        )})}
      </Grid>
      <Button variant="contained" sx={{width: '30%', margin: '15px'}} >
          Close
      </Button>
    </Column>
  );
}