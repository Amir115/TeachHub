import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Column } from "../../theme/layout";
import { Interest as InterestType } from "../../../../common/types";
import useUser from "../../hooks/auth/use-auth";
import {InterestsSelection} from "./InterestSelection";

const Interests = () => {
  const navigate = useNavigate();
  const { firstName } = useUser() || {};

  const onSubmit = (chosenInterests: InterestType[]) => {
    // TODO: send chosenInterests to server
    console.log(chosenInterests);
    navigate("/");
  };

  return (
    <Column sx={{ flex: 1, alignItems: 'center', height: '100%' }}>
      <Typography variant="h4" sx={{ margin: '15px' }}>
        Hi {firstName}, Tell us about your interests
      </Typography>
      {/* TODO: Set interesets & myInterests */}
      <InterestsSelection interests={[]} myInterests={[]} onSubmit={onSubmit} submitButtonTitle={'Show me some lectures!'}/>
    </Column>
  );
};

export default Interests;
