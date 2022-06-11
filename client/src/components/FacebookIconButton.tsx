import { IconButton } from '@mui/material';
import { FC } from 'react';
import { FacebookIcon, FacebookShareButton } from 'react-share';

import { Row } from '../theme/layout';

interface FacebookIconButtonProps {
    quote: string
}

export const FacebookIconButton: FC<FacebookIconButtonProps> = ({ quote }) => (
    <IconButton onClick={e => e.stopPropagation()}>
        <FacebookShareButton url={window.location.href} quote={quote}>
            <Row sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <FacebookIcon size={24} round />
            </Row>
        </FacebookShareButton>
    </IconButton>
);
