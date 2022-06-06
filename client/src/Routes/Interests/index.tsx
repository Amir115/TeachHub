import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Column } from "../../theme/layout";
import { Interest as InterestType } from "../../../../common/types";
import useUser from "../../hooks/auth/use-auth";
import {InterestsSelection} from "./InterestSelection";
import {apiClient} from "../../utils/axios/axios-client";

const Interests = () => {
  const navigate = useNavigate();
  const { firstName } = useUser() || {};

  const onSubmit = async (selectedInterests: InterestType[]) => {
    await apiClient.instance.put('user/interests', {interests: JSON.stringify(selectedInterests)});
    navigate("/");
  };

  return (
    <Column sx={{ flex: 1, alignItems: 'center', height: '100%' }}>
      <Typography variant="h4" sx={{ margin: '15px' }}>
        Hi {firstName}, Tell us about your interests
      </Typography>
      <InterestsSelection onSubmit={onSubmit} submitButtonTitle={'Show me some lectures!'}/>
    </Column>
  );
};

export default Interests;
