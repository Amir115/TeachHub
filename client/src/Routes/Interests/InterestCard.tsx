import {Interest as InterestType} from "../../../../common/types";
import {useState} from "react";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";

export type ToggleState = (interest: InterestType, state: boolean) => void;

interface InterestProps {
  interest: InterestType;
  toggleState: ToggleState;
  defaultChosen?: boolean
}

export const InterestCard = ({ interest, toggleState, defaultChosen = false } : InterestProps) => {
  const [chosen, setChosen] = useState(defaultChosen);

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