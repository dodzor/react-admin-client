// authProvider.js
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

const authProvider = (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const token = btoa(`${username}:${password}`);
    localStorage.setItem('token', token); // Store the token in localStorage
    return Promise.resolve();
  }

  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token'); // Remove the token from localStorage
    return Promise.resolve();
  }

  if (type === AUTH_ERROR) {
    const status = params.status;
    if (status === 401 || status === 403) {
      // Handle unauthorized/forbidden errors
      return Promise.reject();
    }
    return Promise.resolve();
  }

  if (type === AUTH_CHECK) {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  }

  return Promise.reject('Unknown method');
};

export default authProvider;
