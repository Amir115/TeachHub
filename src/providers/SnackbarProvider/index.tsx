import React, { createContext, useContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const SnackbarContext = createContext(null);

export default ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');

    const openMessage = (message, severity) => {
        setOpen(true);
        setMessage(message);
        setSeverity(severity);
    };

    return (
        <SnackbarContext.Provider value={{ openMessage }}>
            {open && (
                <Snackbar
                    open={open}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    autoHideDuration={4000}
                    onClose={() => setOpen(false)}
                >
                    <Alert severity={severity}>{message}</Alert>
                </Snackbar>
            )}
            {children}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => useContext(SnackbarContext);