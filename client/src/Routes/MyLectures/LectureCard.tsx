import { FC, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, Card, Chip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';

import { Lecture } from '../../../../common/types';
import { Row } from '../../theme/layout';

interface LectureCardProps {
    lecture: Lecture,
    setIsOpen: (open: boolean) => void,
    setLecture: (lecture: Lecture) => void
}

export const LectureCard: FC<LectureCardProps> = ({ lecture, setIsOpen, setLecture }) => {
    const navigate = useNavigate();

    const handleEditClick = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setLecture(lecture);
        setIsOpen(true);
    }

    return (
        <Card sx={{ cursor: 'pointer', height: '85%' }} onClick={() => navigate(`../lectures/${lecture._id}`)}>
            <CardHeader
                title={lecture.name}
                subheader={`By: ${lecture.lecturer.firstName} ${lecture.lecturer.lastName}`}
                avatar={<Avatar>{lecture.topic.slice(0, 1).toUpperCase()}</Avatar>}
                action={
                    <Row alignItems={'center'}>
                        <Row>
                            <Typography>{lecture.participants}</Typography>
                            <PersonIcon />
                        </Row>
                        <IconButton onClick={handleEditClick}>
                            <EditIcon />
                        </IconButton>
                    </Row>
                }
            />
            <CardMedia component={'img'} sx={{ height: '40%' }} src={lecture.image.url} />
            <CardContent>
                <Typography variant={'body2'} color={'text.secondary'}>
                    {lecture.information}
                </Typography>
                <Row>
                    {lecture.tags.map((x, i) => (<Chip key={i} label={x} color={'secondary'} sx={{ marginRight: '5px' }} />))}
                </Row>
            </CardContent>
        </Card>
    )
}