import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { CenteredColumn } from "../../theme/layout";
import { LecturePreview, Person } from "../../types";

const lecturer: Person = { firstName: "Moshe", lastName: "Haim" };

const lecturesPreview: LecturePreview[] = [
  {
    id: 1,
    name: "lecture",
    topic: "history",
    lecturer: lecturer,
    information: "This is a lecture info",
    date: new Date(),
  },
  {
    id: 2,
    name: "lecture",
    topic: "history",
    lecturer: lecturer,
    information: "This is a lecture info",
    date: new Date(),
  },
  {
    id: 3,
    name: "lecture",
    topic: "history",
    lecturer: lecturer,
    information: "This is a lecture info",
    date: new Date(),
  },
  {
    id: 4,
    name: "lecture",
    topic: "history",
    lecturer: lecturer,
    information: "This is a lecture info",
    date: new Date(),
  },
  {
    id: 5,
    name: "lecture",
    topic: "history",
    lecturer: lecturer,
    information: "This is a lecture info",
    date: new Date(),
  },
  {
    id: 6,
    name: "lecture",
    topic: "history",
    lecturer: lecturer,
    information: "This is a lecture info",
    date: new Date(),
  },
  {
    id: 7,
    name: "lecture",
    topic: "history",
    lecturer: lecturer,
    information: "This is a lecture info",
    date: new Date(),
  },
  {
    id: 8,
    name: "lecture",
    topic: "history",
    lecturer: lecturer,
    information: "This is a lecture info",
    date: new Date(),
  },
];

const Home = () => {
  const [lectures, setLectures] = useState<LecturePreview[]>([] as LecturePreview[]);

  useEffect(() => {
    // TODO: replace with real server request  
    setTimeout(() => {
        setLectures(lecturesPreview);
    }, 1000);    
  });

  return (
    <CenteredColumn sx={{ flex: 1 }}>
      <Grid container spacing={2}>
        {lectures?.map((lecture) => (
          <Grid key={lecture.id} item xs={3}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar>{lecture.topic.slice(0, 1).toUpperCase()}</Avatar>
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={lecture.name}
                subheader={`By: ${lecture.lecturer.firstName} ${lecture.lecturer.lastName}`}
              />
              <CardMedia
                component="img"
                // height='194'
                image="/static/images/lecture.jpg"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {lecture.information}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </CenteredColumn>
  );
};

export default Home;
