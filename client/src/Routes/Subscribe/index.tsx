import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Column, Row } from '../../theme/layout';
import { Button, Card, CardActions, Stack, Typography } from '@mui/material';
import { useSnackbar } from '../../providers/SnackbarProvider';
import PaypalButtons from './PaypalButtons';
import { Lecture, Person } from '../../../../common/types';
import axios from 'axios';

const Subscribe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { openMessage } = useSnackbar();
    const [lecture, setLecture] = useState<Lecture | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        axios.get<Lecture>(`/api/lectures/${id}`)
            .then(({ data }) => {
                setLecture(data);
                setIsLoading(false);
            })
    }, []);

    const handleSubscribe = async () => {
        try {
            await axios.put<Person>(`/api/user/${lecture?._id}/subscribe`);

            openMessage('Subscribed successfully!', 'success');
            navigate('../');
        } catch (e) {
            openMessage('An error occurred', 'error');
        }
    };

    return (
        <Stack sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ p: 3, width: '40%', height: '500px' }}>
                <Row sx={{ height: '95%', width: '100%' }}>
                    {lecture && <Column sx={{ width: '100%' }}>
                        <Column sx={{ height: '30%' }}>
                            <Typography variant='h4'>{lecture?.name}</Typography>
                            <Typography variant='h5'>{`${lecture?.lecturer.firstName} ${lecture?.lecturer.lastName}`}</Typography>
                        </Column>
                        <Column sx={{ height: '70%', overflowY: 'auto' }}>
                            <Typography variant='h5'>{`Total to pay: ${lecture?.cost}$`}</Typography>
                            <PaypalButtons amount={`${lecture?.cost}`} handleSubscribe={handleSubscribe} />
                        </Column>
                    </Column>}
                </Row>
                <CardActions sx={{ height: '5%', justifyContent: 'flex-end' }}>
                    <Button sx={{ height: '25px' }} variant='contained' color='secondary' onClick={() => navigate(`../lectures/${id}`)}>
                        {'cancel'}
                    </Button>
                </CardActions>
            </Card>
        </Stack>
    );
};

export default Subscribe;
