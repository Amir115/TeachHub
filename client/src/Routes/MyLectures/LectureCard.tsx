import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, Card, Chip } from '@mui/material';
import { Edit, Person } from '@mui/icons-material';
import { LecturePreview } from '../../types';
import { Row } from '../../theme/layout';

interface LectureCardProps {
    lecture: LecturePreview
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
                            <Person />
                        </Row>
                        <IconButton onClick={e => e.stopPropagation()}>
                            <Edit />
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