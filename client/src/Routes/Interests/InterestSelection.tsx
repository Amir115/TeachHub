import React, {FC, useEffect, useState} from "react";
import { Grid, Button } from "@mui/material";

import interestsMock from "../../server-mocks/interests";
import {Column} from "../../theme/layout";
import {Interest as InterestType} from '../../../../common/types';
import {InterestCard, ToggleState} from "./InterestCard";

interface InterestsSelectionProps {
  submitButtonTitle: string;
  onSubmit: (interests: InterestType[]) => void;
  defaultInterests?: InterestType[];
}

export const InterestsSelection: FC<InterestsSelectionProps> = ({submitButtonTitle, onSubmit, defaultInterests = []}) => {
  const [interests, setInterests] = useState<InterestType[]>(
    [] as InterestType[]
  );
  const [chosenInterests, setChosenInterests] = useState<InterestType[]>(
    defaultInterests as InterestType[]
  );

  useEffect(() => {
    // TODO: replace with real server request
    setTimeout(() => {
      setInterests(interestsMock);
    }, 100);
  }, [setInterests]);

  const toggleState: ToggleState = (interest, state) => {
    if (state) {
      setChosenInterests((prev) => [...prev, interest]);

      return;
    }

    return setChosenInterests((prev) =>
      prev.filter((x) => x.id != interest.id)
    );
  };

  return (
    <Column sx={{flex: 1, alignItems: 'center', height: '100%'}}>
      <Grid container spacing={4} sx={{paddingY: 4, overflowY: 'auto'}}>
        {interests?.map((interest) => (
          <Grid key={interest.id} item xs={3}>
            <InterestCard interest={interest} toggleState={toggleState} defaultChosen={chosenInterests.includes(interest)}/>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        onClick={() => onSubmit(chosenInterests)}
        sx={{width: '30%', margin: '15px'}} >
        {submitButtonTitle}
      </Button>
    </Column>
  );
}