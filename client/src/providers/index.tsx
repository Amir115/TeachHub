import React from 'react';
import SnackbarProvider from './SnackbarProvider';

const AppProviders = ({ children }: {children: React.ReactNode}) => <SnackbarProvider>{children}</SnackbarProvider>;

export default AppProviders;