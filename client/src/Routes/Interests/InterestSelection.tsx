import React, {FC, useState} from "react";
import {Grid, Button, CircularProgress} from "@mui/material";

import {Column} from "../../theme/layout";
import {InterestCard, ToggleState} from "./InterestCard";
import {Interest} from "../../../../common/types";
import useFetch from "../../hooks/use-fetch";

interface InterestsSelectionProps {
  submitButtonTitle: string;
  onSubmit: (interests: Interest[]) => Promise<void>;
  defaultInterests?: Interest[];
}

export const InterestsSelection: FC<InterestsSelectionProps> = ({submitButtonTitle, onSubmit, defaultInterests = []}) => {
  const [chosenInterests, setChosenInterests] = useState<Interest[]>(defaultInterests);
  const {data: interests, loading: loadingInterests} = useFetch<[Interest]>("interests");

  const toggleState: ToggleState = (interest, state) => {
    if (state) {
      setChosenInterests((prev) => [...prev, interest]);

      return;
    }

    return setChosenInterests((prev) =>
      prev.filter((x) => x._id != interest._id)
    );
  };

  return (
    <> {
      loadingInterests
        ? <CircularProgress/>
        :
        <Column sx={{flex: 1, alignItems: 'center', height: '100%'}}>
          <Grid container spacing={4} sx={{paddingY: 4, overflowY: 'auto'}}>
            {interests?.map((interest) =>
              <Grid key={interest._id} item xs={3}>
                <InterestCard interest={interest} toggleState={toggleState}
                              defaultSelected={chosenInterests.some(({_id}) => interest._id === _id)}/>
              </Grid>
            )}
          </Grid>
          <Button
            variant="contained"
            onClick={() => onSubmit(chosenInterests)}
            sx={{width: '30%', margin: '15px'}}>
            {submitButtonTitle}
          </Button>
        </Column>
    }
    </>
  );
}