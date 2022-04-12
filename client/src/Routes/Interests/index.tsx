import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Typography,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import interestsMock from "../../server-mocks/interests";
import { Column } from "../../theme/layout";
import { Interest as InterestType } from "../../types";
import useUser from "../../hooks/auth/use-auth";

type ToggleState = (interest: InterestType, state: boolean) => void;

interface InterestProps {
  interest: InterestType;
  toggleState: ToggleState;
}

const Interest = ({ interest, toggleState } : InterestProps) => {
  const [chosen, setChosen] = useState(false);

  const toggle = () => {
    setChosen((prev) => !prev);
    toggleState(interest, !chosen);
  };

  return (
    <Card sx={{ border: chosen ? '5px solid #6dc7de' : '', height: '100%' }} onClick={toggle}>
      <CardMedia
        component="img"
        sx={{ height: "80%" }}
        image={interest.image}
      />
      <CardContent>
        <Typography variant="h5" align="center">
          {interest.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Interests = () => {
  const [interests, setInterests] = useState<InterestType[]>(
    [] as InterestType[]
  );
  const [chosenInterests, setChosenInterests] = useState<InterestType[]>(
    [] as InterestType[]
  );
  const navigate = useNavigate();
  const { username } = useUser() || {};

  useEffect(() => {
    // TODO: replace with real server request
    setTimeout(() => {
      setInterests(interestsMock);
    }, 300);
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

  const afterSelection = () => {
    // TODO: send chosenInterests to server
    navigate("/");
  };

  return (
    <Column sx={{ flex: 1, alignItems: 'center', height: '100%' }}>
      <Typography variant="h4" sx={{ margin: '15px' }}>
        Hi {username}, Tell us about your interests
      </Typography>
      <Grid container spacing={4} sx={{ paddingY: 4, overflowY: 'auto' }}>
        {interests?.map((interest) => (
          <Grid key={interest.id} item xs={3}>
            <Interest interest={interest} toggleState={toggleState} />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        onClick={afterSelection}
        sx={{width: '30%', margin: '15px'}}
      >
        Show me some lectures!
      </Button>
    </Column>
  );
};

export default Interests;
