import axios from 'axios';

export const authClient = {
  instance: axios.create({
    baseURL: '/auth',
    responseType: 'json'
  }),
  authRequired: false
};

export const apiClient = {
  instance: axios.create({
    baseURL: '/api',
    responseType: 'json'
  }),
  authRequired: true
};

export default [apiClient, authClient];
