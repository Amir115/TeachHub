import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Card from "@mui/material/Card";
import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
import {LecturePreview} from "../types";
import { Row } from "../theme/layout";
import { Chip } from "@mui/material";

interface LectureCardProps {
    lecture: LecturePreview
}

export const LectureCard: FC<LectureCardProps> = ({lecture}) => {
    const navigate = useNavigate();
    // const photoId = lecture.id % 4; // TODO: remove when having real photos

    return <Card sx={{cursor: 'pointer', height: '100%'}} onClick={() => navigate(`lectures/${lecture.id}`)}>
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
            image={lecture.image}
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
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
                <ShareIcon />
            </IconButton>
        </CardActions>
    </Card>
}