import { useState, ChangeEventHandler } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import { Socket } from 'socket.io-client';

import { Column, Row } from '../../../theme/layout';
import useWatchComments from './use-watch-comments';
import { ChatMessage } from '../../../../../common/types';

const Comments = ({socket}: {socket: Socket | null}) => {
    const [comment, setComment] = useState('')
    const comments = useWatchComments(socket)

    const onCommentChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
        setComment(event.target.value)
    }

    const onSendClick = () => {
        const message: Partial<ChatMessage> = {
            text: comment
        }

        socket?.emit('comment', message)
        setComment('');
    };

    return (
        <Column sx={{width: 360, p: 2, border: 1, borderRadius: 2, mb: 2}}>
            <Typography variant='h5' sx={{mb: 1, fontWeight: 'bold'}}>Comments</Typography>
            <Box sx={{flex: '1 1 0', mb: 2, overflow: 'scroll'}}>
                {
                    comments.map(comment => (
                        <Box key={comment.id} sx={{mb: 1, wordBreak: 'break-word'}}>
                            <b>{comment.user?.firstName} {comment.user?.lastName}</b>: {comment.text}
                        </Box>
                    ))
                }
            </Box>
            <Row>
                <TextField 
                    onChange={onCommentChange}
                    value={comment}
                    placeholder="Say something..."
                    sx={{mr: 1, width: 1}}
                />
                <Button variant='contained' onClick={onSendClick}>Send</Button>
            </Row>
            
        </Column>
    )
};

export default Comments;