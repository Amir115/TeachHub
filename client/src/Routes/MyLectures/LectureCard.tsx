import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, Card, Chip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';

import { Lecture } from '../../../../common/types';
import { Row } from '../../theme/layout';

interface LectureCardProps {
    lecture: Lecture
}

export const LectureCard: FC<LectureCardProps> = ({ lecture }) => {
    const navigate = useNavigate();

    return (
        <Card sx={{ cursor: 'pointer', height: '85%' }} onClick={() => navigate(`../lectures/${lecture.id}`)}>
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
                        <IconButton onClick={e => e.stopPropagation()}>
                            <EditIcon />
                        </IconButton>
                    </Row>
                }
            />
            <CardMedia component={'img'} sx={{ height: '40%' }} image={lecture.image} />
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