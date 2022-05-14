import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Column, Row } from '../../theme/layout';
import { Button, Card, CardActions, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDate from '@mui/lab/AdapterMoment';
import lectures from '../../server-mocks/lectures';
import { useSnackbar } from '../../providers/SnackbarProvider';
import { getSubscribedLecturesIds } from '../../server-mocks/utils';
import PaypalButtons from './PaypalButtons';

const Subscribe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { openMessage } = useSnackbar();
    const [cardNumber, setCardNumber] = useState();
    const [name, setName] = useState();
    const [cvv, setCvv] = useState();
    const [expirationDate, setExpirationDate] = useState<Date | undefined | null>();

    // TODO: fetch from server
    const lecture = lectures.find(x => x.id === id);

    const handleSubscribe = () => {
        localStorage.setItem('lectures', JSON.stringify([...getSubscribedLecturesIds(), lecture?.id]));
        
        openMessage('Subscribed successfully!', 'success');
        navigate('../');
    };

    return (
        <Stack sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ p: 3, width: '40%', height: '500px' }}>
                <Row sx={{ height: '95%', width: '100%' }}>
                    <Column sx={{ width: '100%' }}>
                        <Column sx={{ height: '30%' }}>
                            <Typography variant='h4'>{lecture?.name}</Typography>
                            <Typography variant='h5'>{`${lecture?.lecturer.firstName} ${lecture?.lecturer.lastName}`}</Typography>
                        </Column>
                        <Column sx={{ height: '70%', overflowY: 'auto' }}>
                            <Typography variant='h5'>{`Total to pay: ${lecture?.cost}$`}</Typography>
                            <PaypalButtons amount={`${lecture?.cost}`} handleSubscribe={handleSubscribe} />
                        </Column>
                    </Column>
                </Row>
                <CardActions sx={{ height: '5%', justifyContent: 'flex-end'}}>
                    <Button sx={{ height: '25px' }} variant='contained' color='secondary' onClick={() => navigate(`../lectures/${id}`)}>
                        {'cancel'}
                    </Button>
                </CardActions>
            </Card>
        </Stack>
    );
};

export default Subscribe;
