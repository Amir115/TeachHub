import React from 'react';
import SnackbarProvider from './SnackbarProvider';

const AppProviders = ({ children }) => <SnackbarProvider>{children}</SnackbarProvider>;

export default AppProviders;