import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import { CenteredColumn } from "../../theme/layout";
import { LecturePreview } from "../../types";
import {LectureCard} from "../../components/LectureCard";

import lecturesMock from "../../server-mocks/lectures";

const Home = () => {

  const [lectures, setLectures] = useState<LecturePreview[]>([] as LecturePreview[]);

  useEffect(() => {
    // TODO: replace with real server request
    setTimeout(() => {
        setLectures(lecturesMock);
    }, 1000);
  });

  return (
    <CenteredColumn sx={{ flex: 1 }}>
      <Grid container spacing={2}>
        {lectures?.map((lecture) => (
          <Grid key={lecture.id} item xs={3}>
            <LectureCard lecture={lecture}/>
          </Grid>
        ))}
      </Grid>
    </CenteredColumn>
  );
};

export default Home;
