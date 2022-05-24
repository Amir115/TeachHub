import React, {FC} from "react";
import {useNavigate} from "react-router-dom";

import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import {Lecture} from "../../../common/types";
import { Row } from "../theme/layout";
import { Chip } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

interface LectureCardProps {
    lecture: Lecture
}

export const LectureCard: FC<LectureCardProps> = ({lecture}) => {
    const navigate = useNavigate();

    return <Card sx={{cursor: 'pointer', height: '100%'}} onClick={() => navigate(`lectures/${lecture._id}`)}>
        <CardHeader
            avatar={
                <Avatar>{lecture.topic.slice(0, 1).toUpperCase()}</Avatar>
            }
            action={
                <IconButton onClick={e => e.stopPropagation()}>
                    <MoreVertIcon />
                </IconButton>
            }
            title={lecture.name}
            subheader={`By: ${lecture.lecturer.firstName} ${lecture.lecturer.lastName}`}
        />
        <CardMedia
            component="img"
            sx={{height: '40%'}}
            image={lecture.image.url}
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                {lecture.information}
            </Typography>
            <Row>
                {lecture.tags.map((x, i) => (<Chip key={i} label={x} color='secondary' sx={{ marginRight: '5px' }} />)) }
            </Row>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={e => e.stopPropagation()}>
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share" onClick={e => e.stopPropagation()}>
                <ShareIcon />
            </IconButton>
        </CardActions>
    </Card>
}