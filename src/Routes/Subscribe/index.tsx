import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Column, Row } from '../../theme/layout';
import { Button, Card, CardActions, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDate from '@mui/lab/AdapterMoment';
import lectures from '../../server-mocks/lectures';
import { useSnackbar } from '../../providers/SnackbarProvider';

const Subscribe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { openMessage } = useSnackbar();
    const [cardNumber, setCardNumber] = useState();
    const [name, setName] = useState();
    const [cvv, setCvv] = useState();
    const [expirationDate, setExpirationDate] = useState();

    // TODO: fetch from server
    const lecture = lectures.find(x => x.id.toString() === id);

    const handleSubscribe = () => {
        const currentLectures = JSON.parse(localStorage.getItem('lectures')) || [];
        localStorage.setItem('lectures', JSON.stringify([...currentLectures, id]));
        
        openMessage('Subscribed successfully!', 'success');
        navigate('../');
    };

    return (
        <Stack sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ p: 3, width: '60%', height: '70%' }}>
                <Row sx={{ height: '95%', width: '100%', justifyContent: 'space-between' }}>
                    <Column sx={{ width: '45%', borderRight: 'grey 1px solid' }}>
                        <Column flex={1} sx={{ height: '100%' }}>
                            <Typography variant='h4'>{lecture.name}</Typography>
                            <Typography variant='h5'>{`${lecture.lecturer.firstName} ${lecture.lecturer.lastName}`}</Typography>
                        </Column>
                        <Column flex={1} sx={{ height: '100%' }}>
                            <Typography variant='h5'>{`Total to pay: ${lecture?.cost}$`}</Typography>
                            <Button variant='contained' color='secondary' sx={{ width: '75%' }}>
                                PayPal
                            </Button>
                        </Column>
                    </Column>
                    <Column sx={{ width: '45%' }}>
                        <Column>
                            <TextField
                                name='cardNumber'
                                label='Card Number'
                                margin='normal'
                                required
                                fullWidth
                            />
                            <TextField
                                name='name'
                                label='Card Holder Name'
                                margin='normal'
                                required
                                fullWidth
                            />
                            <Row sx={{ alignItems: 'center' }}>
                                <Row sx={{ width: '50%' }}>
                                    <LocalizationProvider dateAdapter={AdapterDate}>
                                        <DatePicker
                                            views={['month', 'year']}
                                            label='Expiration Date'
                                            inputFormat='MM/yyyy'
                                            value={expirationDate}
                                            onChange={newValue => setExpirationDate(newValue)}
                                            renderInput={params => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Row>
                                <TextField
                                    sx={{ width: '50%', margin: '8px 0 8px 4px' }}
                                    name='cvv'
                                    label='Security Code'
                                    margin='normal'
                                    required
                                    fullWidth
                                />
                            </Row>
                        </Column>
                        <Column
                            sx={{
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                            }}
                        >
                            <Button variant='contained' color='secondary' onClick={handleSubscribe}>
                                Pay Now
                            </Button>
                            <img
                                style={{ width: '300px' }}
                                src='/static/images/payment-methods.jpg'
                            />
                        </Column>
                    </Column>
                </Row>
                <CardActions sx={{ height: '5%', justifyContent: 'flex-end'}}>
                    <Button sx={{ height: '25px' }} variant='contained' color='secondary' onClick={() => navigate(`../lectures/${id}`)}>
                        cancel
                    </Button>
                </CardActions>
            </Card>
        </Stack>
    );
};

export default Subscribe;
