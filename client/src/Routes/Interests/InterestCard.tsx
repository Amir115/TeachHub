import {Interest as InterestType} from "../../../../common/types";
import {useState} from "react";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import { apiClient } from "../../utils/axios/axios-client";

export type ToggleState = (interest: InterestType, state: boolean) => void;

interface InterestProps {
  interest: InterestType;
  isEdit: boolean;
  defaultSelected: boolean;
}

export const InterestCard = ({ interest, isEdit, defaultSelected } : InterestProps) => {
  const [chosen, setChosen] = useState(defaultSelected);

  const toggle = async () => {
    if (isEdit) {
      await apiClient.instance.put('user/interest', interest.id);
      setChosen((prev) => !prev);
    }
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