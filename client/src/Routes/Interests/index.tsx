import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import interestsMock from "../../server-mocks/interests";
import { Column } from "../../theme/layout";
import { Interest as InterestType } from "../../../../common/types";
import useUser from "../../hooks/auth/use-auth";
import {InterestsSelection} from "./InterestSelection";

const Interests = () => {
  const navigate = useNavigate();
  const { username } = useUser() || {};

  const onSubmit = (chosenInterests: InterestType[]) => {
    // TODO: send chosenInterests to server
    console.log(chosenInterests);
    navigate("/");
  };

  return (
    <Column sx={{ flex: 1, alignItems: 'center', height: '100%' }}>
      <Typography variant="h4" sx={{ margin: '15px' }}>
        Hi {username}, Tell us about your interests
      </Typography>
      <InterestsSelection onSubmit={onSubmit} submitButtonTitle={'Show me some lectures!'}/>
    </Column>
  );
};

export default Interests;
